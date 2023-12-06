package trizzle.trizzlebackend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import trizzle.trizzlebackend.domain.Like;

import java.util.List;

public interface LikeRepository extends MongoRepository<Like, String> {
    Like findByPostIdAndAccountId(String postId, String accountId);
    Like findByReviewIdAndAccountId(String reviewId, String accountId);
    Like findByCommentIdAndAccountId(String commentId, String accountId);

    List<Like> findByTypeAndCommentId(String type, String commentId);

    List<Like> findByPostId(String postId);
}
