package trizzle.trizzlebackend.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import trizzle.trizzlebackend.Utils.JwtUtil;
import trizzle.trizzlebackend.domain.Place;
import trizzle.trizzlebackend.domain.Review;
import trizzle.trizzlebackend.repository.ReviewRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final PlaceService placeService;
    @Value("${jwt.secret}")
    private String secretKey;

    public Review insertReview(Review review, String accountId) {
        review.setAccountId(accountId);
        LocalDateTime dateTime = LocalDateTime.now();
        review.setReviewRegistrationDate(dateTime);   // 일정 등록 시 현재시간을 등록시간으로 저장

        Place place = review.getPlace();
        Optional<Place> existingPlace = placeService.findByPlaceId(place.getId());
        if (!existingPlace.isPresent()) {    // place정보가 db에 없다면 저장
            placeService.savePlace(place);
        }

        return reviewRepository.save(review);
    }

    public Review searchReview(String reviewId, HttpServletRequest request) {
        Optional<Review> reviewOptional = reviewRepository.findById((reviewId));
        if (reviewOptional.isPresent()) {   // reviewId에 해당하는 review가 있을 경우
            Review review = reviewOptional.get();

            if (review.isReviewSecret()) {  // 비공개일 경우 cookie의 accountId와 review의 accountId 비교
                String token = JwtUtil.getAccessTokenFromCookie(request);
                String accountId;
                if (token == null) {    // token없는 경우 null반환
                    return null;
                } else{
                    accountId = JwtUtil.getAccountId(token,secretKey);
                }
                
                if (accountId.equals(review.getAccountId())) {     //cookie의 accountId와 review의 accountId 일치하는 경우
                    return review;
                } else return null;
                
            } else { // 공개 review일 경우 review 반환
                return review;
            }

        } else {                            // reviewId에 해당하는 review가 없을 경우
            return null;
        }
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

    public void deleteReview(String reviewId) {
        reviewRepository.deleteById(reviewId);
    }

}
