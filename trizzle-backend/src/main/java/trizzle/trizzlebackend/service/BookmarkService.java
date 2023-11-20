package trizzle.trizzlebackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import trizzle.trizzlebackend.domain.Bookmark;
import trizzle.trizzlebackend.domain.Like;
import trizzle.trizzlebackend.domain.Post;
import trizzle.trizzlebackend.domain.Review;
import trizzle.trizzlebackend.repository.BookmarkRepository;
import trizzle.trizzlebackend.repository.PostRepository;
import trizzle.trizzlebackend.repository.ReviewRepository;

import java.awt.print.Book;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class BookmarkService {
    private final BookmarkRepository bookmarkRepository;
    private final PostService postService;
    private final PostRepository postRepository;
    private final ReviewService reviewService;
    private final ReviewRepository reviewRepository;

    @Transactional
    public String convertBookmark(String type, String contentId, String accountId) {
        Bookmark exisgtingBookmark = null;
        switch (type) {
            case "post":
                exisgtingBookmark = bookmarkRepository.findByPostIdAndAccountId(contentId, accountId);
                break;
            case "review":
                exisgtingBookmark = bookmarkRepository.findByReviewIdAndAccountId(contentId, accountId);
                break;
        }

        if (exisgtingBookmark == null) {
            Bookmark bookmark = null;
            LocalDateTime dateTime = LocalDateTime.now();  // 현재시간을 등록시간으로 저장

            switch (type) {
                case "post":
                    bookmark = Bookmark.builder()
                            .postId(contentId)
                            .accountId(accountId)
                            .bookmarkRegistrationDate(dateTime)
                            .build();
                    bookmarkRepository.save(bookmark);  // 북마크 저장

                    /* 북마크 누르면 count 1 증가 */
                    Post post = postService.findPost(contentId);
                    post.increaseBookmarks();
                    postRepository.save(post);
                    break;

                case "review":
                    bookmark = Bookmark.builder()
                            .reviewId(contentId)
                            .accountId(accountId)
                            .bookmarkRegistrationDate(dateTime)
                            .build();
                    bookmarkRepository.save(bookmark);  // 북마크 저장

                    /* 북마크 누르면 count 1 증가 */
                    Review review = reviewService.findReview(contentId);
                    review.increaseBookmarks();
                    reviewRepository.save(review);
                    break;
            }
            return "add bookmark success";
        } else {
            bookmarkRepository.delete(exisgtingBookmark);
            switch (type) {
                case "post":
                    /* 북마크 취소하면 count 1 감소 */
                    Post post = postService.findPost(contentId);
                    post.decreaseBookmarks();
                    postRepository.save(post);
                    break;

                case "review":
                    /* 북마크 취소하면 count 1 감소 */
                    Review review = reviewService.findReview(contentId);
                    review.decreaseBookmarks();
                    reviewRepository.save(review);
                    break;
            }
            return "delete bookmark success";
        }
    }
}
