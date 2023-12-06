package trizzle.trizzlebackend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import trizzle.trizzlebackend.domain.Bookmark;
import java.util.List;

public interface BookmarkRepository extends MongoRepository<Bookmark, String> {
    Bookmark findByPostIdAndAccountId(String postId, String accountId);
    Bookmark findByReviewIdAndAccountId(String reviewId, String accountId);
    List<Bookmark> findByAccountIdAndType(String accountId, String type);

    List<Bookmark> findByPostId(String postId);

    List<Bookmark> findByReviewId(String reviewId);
}
