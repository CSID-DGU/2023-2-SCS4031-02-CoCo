package trizzle.trizzlebackend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import trizzle.trizzlebackend.domain.Post;

import java.util.List;

public interface PostRepository extends MongoRepository<Post, String> {
    List<Post> findByAccountId(String accountId);

    List<Post> findTop4ByPostSecretOrderByLikeCountDesc(boolean postSecret);

    List<Post> findByAccountIdAndPostSecret(String accountId, boolean postSecret);

    Post findByIdAndAccountId(String postId, String accountId);
};
