package trizzle.trizzlebackend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import trizzle.trizzlebackend.domain.Comment;

import java.util.List;

public interface CommentRepository extends MongoRepository<Comment, String> {

    List<Comment> findByPostId(String postId);
    List<Comment> findByAccountId(String accountId);
    List<Comment> findByReviewId(String reviewId);
    List<Comment> findByParentId(String parentId);
};
