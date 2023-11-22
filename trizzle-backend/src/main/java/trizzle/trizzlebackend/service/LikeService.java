package trizzle.trizzlebackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import trizzle.trizzlebackend.domain.*;
import trizzle.trizzlebackend.repository.CommentRepository;
import trizzle.trizzlebackend.repository.LikeRepository;
import trizzle.trizzlebackend.repository.PostRepository;
import trizzle.trizzlebackend.repository.ReviewRepository;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;
    private final PostService postService;
    private final PostRepository postRepository;
    private final ReviewService reviewService;
    private final ReviewRepository reviewRepository;
    private final CommentService commentService;
    private final CommentRepository commentRepository;

    @Transactional
    public String convertLike(String type, String contentId, String accountId) {
        Like existingLike = null;
        switch (type) { // type에 따른 id 와 accountId로 좋아요 기록 찾음
            case "post":
                existingLike = likeRepository.findByPostIdAndAccountId(contentId, accountId);
                break;
            case "review":
                existingLike = likeRepository.findByReviewIdAndAccountId(contentId, accountId);
                break;
            case "comment":
                existingLike = likeRepository.findByCommentIdAndAccountId(contentId, accountId);
        }

        if (existingLike == null) { // 좋아요 없다면 좋아요 생성
            Like like = null;
            LocalDateTime dateTime = LocalDateTime.now();  // 현재시간을 등록시간으로 저장

            switch (type) {
                case "post":
                    like = Like.builder()
                            .postId(contentId)
                            .accountId(accountId)
                            .likeRegistrationDate(dateTime)
                            .type("post")
                            .build();
                    likeRepository.save(like);  // 좋아요 저장

                    /* 좋아요 누르면 count 1 증가 */
                    Post post = postService.findPost(contentId);
                    post.increaseLikes();
                    postRepository.save(post);
                    break;

                case "review":
                    like = Like.builder()
                            .reviewId(contentId)
                            .accountId(accountId)
                            .likeRegistrationDate(dateTime)
                            .type("review")
                            .build();
                    likeRepository.save(like);  // 좋아요 저장

                    /* 좋아요 누르면 count 1 증가 */
                    Review review = reviewService.findReview(contentId);
                    review.increaseLikes();
                    reviewRepository.save(review);
                    break;

                case "comment":
                    like = Like.builder()
                            .commentId(contentId)
                            .accountId(accountId)
                            .likeRegistrationDate(dateTime)
                            .type("comment")
                            .build();
                    likeRepository.save(like);  // 좋아요 저장

                    /* 좋아요 누르면 count 1 증가 */
                    Comment comment = commentService.findComment(contentId);
                    comment.increaseLikes();
                    commentRepository.save(comment);
                    break;
            }
            return "add like success";

        } else {    // 좋아요 있다면 삭제
            likeRepository.delete(existingLike);

            switch (type) {
                case "post":
                    /* 좋아요 취소하면 count 1 감소 */
                    Post post = postService.findPost(contentId);
                    post.decreaseLikes();
                    postRepository.save(post);
                    break;

                case "review":
                    /* 좋아요 취소하면 count 1 감소 */
                    Review review = reviewService.findReview(contentId);
                    review.decreaseLikes();
                    reviewRepository.save(review);
                    break;

                case "comment":
                    /* 좋아요 취소하면 count 1 감소 */
                    Comment comment = commentService.findComment(contentId);
                    comment.decreaseLikes();
                    commentRepository.save(comment);
                    break;
            }
            return "delete like success";
        }

    }
}
