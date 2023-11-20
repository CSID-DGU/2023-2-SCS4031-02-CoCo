package trizzle.trizzlebackend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import trizzle.trizzlebackend.domain.Bookmark;

public interface BookmarkRepository extends MongoRepository<Bookmark, String> {
    Bookmark findByPostIdAndAccountId(String postId, String accountId);
    Bookmark findByReviewIdAndAccountId(String reviewId, String accountId);
}
