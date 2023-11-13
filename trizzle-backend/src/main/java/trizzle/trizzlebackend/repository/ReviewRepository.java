package trizzle.trizzlebackend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import trizzle.trizzlebackend.domain.Review;

public interface ReviewRepository extends MongoRepository<Review, String> {
}
