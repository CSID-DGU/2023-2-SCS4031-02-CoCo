package trizzle.trizzlebackend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import trizzle.trizzlebackend.domain.Follow;

import java.util.List;

public interface FollowRepository extends MongoRepository<Follow, String> {
    Follow findByFollowerIdAndFolloweeId(String followerId, String followeeId);

    List<Follow> findByFolloweeId(String followeeId);

    List<Follow> findByFollowerId(String followerId);
}
