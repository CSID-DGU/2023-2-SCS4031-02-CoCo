package trizzle.trizzlebackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;
import trizzle.trizzlebackend.domain.Place;
import trizzle.trizzlebackend.domain.Review;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final MongoRepository<Review, String> mongoRepository;
    private final PlaceService placeService;

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
}
