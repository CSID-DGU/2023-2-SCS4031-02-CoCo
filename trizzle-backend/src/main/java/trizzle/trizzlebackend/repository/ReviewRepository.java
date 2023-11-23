package trizzle.trizzlebackend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import trizzle.trizzlebackend.domain.Review;

import java.util.List;

public interface ReviewRepository extends MongoRepository<Review, String> {
    List<Review> findByAccountId(String accountId);

    List<Review> findByPlaceIdAndReviewSecret(String placeId, boolean reviewSecret);

    Review findByIdAndAccountId(String reviewId, String accountId);
}
