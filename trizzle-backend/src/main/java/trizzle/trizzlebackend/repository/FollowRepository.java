package trizzle.trizzlebackend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import trizzle.trizzlebackend.domain.Follow;

public interface FollowRepository extends MongoRepository<Follow, String> {
    Follow findByFollowerIdAndFolloweeId(String followerId, String followeeId);
}
