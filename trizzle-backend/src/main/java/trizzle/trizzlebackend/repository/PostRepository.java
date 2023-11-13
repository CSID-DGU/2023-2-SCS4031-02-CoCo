package trizzle.trizzlebackend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import trizzle.trizzlebackend.domain.Post;

public interface PostRepository extends MongoRepository<Post, String> {
}
