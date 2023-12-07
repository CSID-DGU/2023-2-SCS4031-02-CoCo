package trizzle.trizzlebackend.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import trizzle.trizzlebackend.Utils.JwtUtil;
import trizzle.trizzlebackend.domain.*;
import trizzle.trizzlebackend.dto.response.ReviewDto;
import trizzle.trizzlebackend.repository.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewService {

    @Autowired
    private final ElasticReviewRepository elasticReviewRepository;
    private final ReviewRepository reviewRepository;
    private final PlaceService placeService;
    private final BookmarkRepository bookmarkRepository;
    private final LikeRepository likeRepository;
    private final UserService userService;
    private final PlanRepository planRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    @Value("${jwt.secret}")
    private String secretKey;

    public Review insertReview(Review review, String accountId) {
        if (review.getId() == null) {
            review.setAccountId(accountId);
            LocalDateTime dateTime = LocalDateTime.now();
            review.setReviewRegistrationDate(dateTime);   // 일정 등록 시 현재시간을 등록시간으로 저장
        }

        Place place = review.getPlace();
        Optional<Place> existingPlace = placeService.findByPlaceId(place.getId());
        if (!existingPlace.isPresent()) {    // place정보가 db에 없다면 저장
            placeService.savePlace(place);
        }
        /*elasticSearch 위해*/
        Review insert = reviewRepository.save(review);
        if (!review.isReviewSecret()) { //공개 review만 검색가능하게 저장되도록
            ElasticReview elasticReview = new ElasticReview();
            elasticReview.setLocation(insert.getPlace().getAddressName());
            elasticReview.setData(insert.getId(), insert.getAccountId(), insert.getReviewTitle(), insert.getReviewRegistrationDate(),
                    insert.getVisitDate(), insert.getPlace(), insert.getReviewContent(), insert.getPlanId(), insert.getPostId(),
                    insert.getPostName(), insert.getThumbnail(), insert.isReviewSecret(), insert.getLikeCount(), insert.getBookmarkCount(), insert.getReviewContentText(),
                    insert.getCommentCount());
            elasticReviewRepository.save(elasticReview);
        }
        return insert;
    }

    public ReviewDto searchReview(String reviewId, HttpServletRequest request) {
        Optional<Review> reviewOptional = reviewRepository.findById((reviewId));
        if (reviewOptional.isPresent()) {   // reviewId에 해당하는 review가 있을 경우
            Review review = reviewOptional.get();

            if (review.isReviewSecret()) {  // 비공개일 경우 cookie의 accountId와 review의 accountId 비교
                User reviewUser = userService.searchUser(review.getAccountId());
                ReviewDto reviewDto = new ReviewDto();
                reviewDto.setReview(review);
                reviewDto.setReviewUser(reviewUser);

                String token = JwtUtil.getAccessTokenFromCookie(request);
                String accountId;
                if (token == null) {    // token없는 경우 null반환
                    return null;
                } else{
                    accountId = JwtUtil.getAccountId(token,secretKey);
                }
                
                if (accountId.equals(review.getAccountId())) {     //cookie의 accountId와 review의 accountId 일치하는 경우
                    return reviewDto;
                } else return null;
                
            } else { // 공개 review일 경우 review 반환
                review.increaseViewCounts();    //조회수 증가
                reviewRepository.save(review);
                User reviewUser = userService.searchUser(review.getAccountId());
                ReviewDto reviewDto = new ReviewDto();
                reviewDto.setReview(review);
                reviewDto.setReviewUser(reviewUser);

                String token = JwtUtil.getAccessTokenFromCookie(request);
                String accountId;
                if (token == null) {
                    return reviewDto;
                } else {
                    accountId = JwtUtil.getAccountId(token, secretKey);
                }

                Like like = likeRepository.findByReviewIdAndAccountId(reviewId, accountId);
                if (like != null) {     // 좋아요 했으면 isLike true로
                    reviewDto.setLike(true);
                } else { // 좋아요 안했으면 isLike false로
                    reviewDto.setLike(false);
                }

                Bookmark bookmark = bookmarkRepository.findByReviewIdAndAccountId(reviewId, accountId);
                if (bookmark != null) { // 북마크 했으면 isBookmark true로
                    reviewDto.setBookmark(true);
                } else {    // 북마크 안했으면 isBookmark false로
                    reviewDto.setBookmark(false);
                }
                return reviewDto;
            }

        } else {                            // reviewId에 해당하는 review가 없을 경우
            return null;
        }
    }

    public Page<ElasticReview> findAllReview(Pageable pageable) {
        Page<ElasticReview> reviews = elasticReviewRepository.findAll(pageable);
        return reviews;
    }

    public Page<ElasticReview>  searchReviewByKeyword(String location, String keyword, Pageable pageable) {
        Page<ElasticReview> reviews;
        if(location.equals("전체") ) {
                reviews = elasticReviewRepository.searchByReviewTitleOrReviewContentText(keyword, pageable);
        }  else {
            reviews = elasticReviewRepository.searchByReviewTitleOrReviewContentTextAndLocation(keyword, location, pageable);
//            reviews = elasticReviewRepository.searchByLocation(location, pageable);
        }

        return reviews;
    }

    public Review findReview(String reviewId) {
        Optional<Review> optionalReview = reviewRepository.findById(reviewId);
        return optionalReview.orElse(null);
    }

    public Review updateReview(Review review, String reviewId, String accountId) {
        review.setId(reviewId);
        return insertReview(review, accountId);
    }

    public List<Review> findMyReviews(String accountId) {
        List<Review> myReviews = reviewRepository.findByAccountId(accountId);
        return myReviews;
    }

    public List<Review> findPublicReview(String accountId) {
        List<Review> publicReviews = reviewRepository.findByAccountIdAndReviewSecret(accountId, false);
        return publicReviews;
    }

    public void deleteReview(String reviewId, String accountId) {
        elasticReviewRepository.deleteById(reviewId);
        Review review = reviewRepository.findByIdAndAccountId(reviewId, accountId);

        if (review.getPlanId() != null) {
            Optional<Plan> existingPlan = planRepository.findById(review.getPlanId());
            if (existingPlan.isPresent()) {
                Plan plan = existingPlan.get();
                /* plan의 review정보 삭제 */
                planUpdateReviewToNull(plan, reviewId);

                /* post의 review정보 삭제 */
                if (plan.getPostId() != null) {
                    postUpdateReviewToNull(plan.getPostId(), reviewId);
                }
            }

        }
        /* 댓글의 좋아요 정보 삭제 & 댓글 삭제*/
        List<Comment> comments = commentRepository.findByReviewId(reviewId);
        if (comments != null) {
            for (Comment comment : comments) {
                deleteLikesByCommentId(comment.getId());
                commentRepository.delete(comment);
            }
        }

        /* 북마크 삭제 */
        List<Bookmark> bookmarks = bookmarkRepository.findByReviewId(reviewId);
        if (bookmarks != null) {
            for (Bookmark bookmark : bookmarks) {
                bookmarkRepository.delete(bookmark);
            }
        }
        reviewRepository.delete(review);

        /* 좋아요 삭제*/
        List<Like> likes = likeRepository.findByReviewId(reviewId);
        if (likes != null) {
            for (Like like : likes) {
                likeRepository.delete(like);
            }
        }
    }

    public List<Review> findBookmarkReviews(String accountId) {
        String type = "review";
        List<Bookmark> bookmarks = bookmarkRepository.findByAccountIdAndType(accountId, type);
        List<Review> reviews = new ArrayList<>();

        for (Bookmark bookmark : bookmarks) {
            Review review = reviewRepository.findById(bookmark.getReviewId()).orElse(null);
            if (review != null) {
                reviews.add(review);
            }
        }

        return reviews;
    }

    public Review checkMyReview(String reviewId, String accountId) {
        return reviewRepository.findByIdAndAccountId(reviewId, accountId);
    }

    public List<Review> findMyReviewsWithPlaceId(String accountId, String placeId) {
        List<Review> reviews = reviewRepository.findByAccountIdAndPlaceIdAndPlanIdIsNull(accountId, placeId);
        return reviews;
    }

    public List<Review> findReviewsWithPlaceId(String placeId) {
        Boolean secret = false;
        List<Review> reviews = reviewRepository.findByPlaceIdAndReviewSecret(placeId, false);
        return reviews;
    }

    @Transactional
    public String reviewConnect(Plan plan, String reviewId, String accountId) {
        /*review 연동 된 것 plan에 반영*/
        Plan existingPlan = planRepository.findByIdAndAccountId(plan.getId(), accountId);
        if (existingPlan != null) {
            existingPlan.setContent(plan.getContent());
            planRepository.save(existingPlan);

            /* postId null 아니라면(post연동된 일정이라면) post의 plan에 해당 review 추가*/
            if (existingPlan.getPostId() != null) {
                Post post = postRepository.findByIdAndAccountId(existingPlan.getPostId(), accountId);
                post.setPlan(existingPlan);
                postRepository.save(post);
            }

            /* review에 planId 추가*/
            Review review = reviewRepository.findByIdAndAccountId(reviewId, accountId);
            if (review != null) {
                review.setPlanId(existingPlan.getId());
                reviewRepository.save(review);
            } else {
                return "connect fail";
            }
        } else {
            return "connect fail";
        }

        return "connect";
    }

    @Transactional
    public String reviewDisconnect(Plan plan, String reviewId, String accountId) {
        /*review 연동해제 된 것 plan에 반영*/
        Plan existingPlan = planRepository.findByIdAndAccountId(plan.getId(), accountId);
        if (existingPlan != null) {
            existingPlan.setContent(plan.getContent());
            planRepository.save(existingPlan);

            /* postId null 아니라면(post연동된 일정이라면) post의 해당 review null로*/
            if (existingPlan.getPostId() != null) {
                Post post = postRepository.findByIdAndAccountId(existingPlan.getPostId(), accountId);
                post.setPlan(existingPlan);
                postRepository.save(post);
            }

            /* review에 planId null로 (연동해제)*/
            Review review = reviewRepository.findByIdAndAccountId(reviewId, accountId);
            if (review != null) {
                review.setPlanId(null);
                reviewRepository.save(review);
            } else {
                return "disconnect fail";
            }
        } else {
            return "disconnect fail";
        }

        return "disconnect";
        }

    private void planUpdateReviewToNull(Plan plan, String reviewId) {
        if (plan != null) {
            /*plan의 review 정보 삭제*/
            for (Day day : plan.getContent()) { //content의 날짜(day)에 따라
                for (Place place : day.getPlaceList()) {    // place 항목을 확인
                    if (place.getId() != null && place.getReview() != null) { // keyword아닌 place이고 review가 있다면
                        if (place.getReview().getId().equals(reviewId)) {   // reviewId와 일치하는 review null로
                            place.setReview(null);
                        }

                    }
                }
            }
        }
        planRepository.save(plan);
    }

    private void postUpdateReviewToNull(String postId, String reviewId) {
        Optional<Post> existingPost = postRepository.findById(postId);
        Post post = existingPost.get();
        Plan plan = post.getPlan();
        if (plan != null) {
            /*plan의 review 정보 삭제*/
            for (Day day : plan.getContent()) { //content의 날짜(day)에 따라
                for (Place place : day.getPlaceList()) {    // place 항목을 확인
                    if (place.getId() != null && place.getReview() != null) { // keyword아닌 place이고 review가 있다면
                        if (place.getReview().getId().equals(reviewId)) {   // reviewId와 일치하는 review null로
                            place.setReview(null);
                        }

                    }
                }
            }
        }
        post.setPlan(plan);
        postRepository.save(post);
    }

    private void deleteLikesByCommentId(String commentId) {
        List<Like> likes = likeRepository.findByTypeAndCommentId("comment", commentId);
        if (likes != null) {
            for (Like like : likes) {
                likeRepository.delete(like);
            }
        }
    }
}
