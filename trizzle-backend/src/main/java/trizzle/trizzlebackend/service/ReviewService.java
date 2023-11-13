package trizzle.trizzlebackend.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;
import trizzle.trizzlebackend.Utils.JwtUtil;
import trizzle.trizzlebackend.domain.Place;
import trizzle.trizzlebackend.domain.Review;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final MongoRepository<Review, String> mongoRepository;
    private final PlaceService placeService;
    @Value("${jwt.secret}")
    private String secretKey;

    public Review insertReview(Review review, String accountId) {
        review.setAccountId(accountId);
        LocalDateTime dateTime = LocalDateTime.now();
        review.setReviewRegistrationDate(dateTime);   // 일정 등록 시 현재시간을 등록시간으로 저장

        Place place = review.getPlace();
        Optional<Place> existingPlace = placeService.findByPlaceId(place.get_id());
        if (!existingPlace.isPresent()) {    // place정보가 db에 없다면 저장
            placeService.savePlace(place);
        }

        return mongoRepository.save(review);
    }

    public Review searchReview(String reviewId, HttpServletRequest request) {
        Optional<Review> reviewOptional = mongoRepository.findById((reviewId));
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

    public Review updateReview(Review reivew, String reveiwId, String accountId) {
        reivew.setId(reveiwId);
        return insertReview(reivew, accountId);
    }

}
