package trizzle.trizzlebackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import trizzle.trizzlebackend.domain.Like;
import trizzle.trizzlebackend.repository.LikeRepository;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;
    @Transactional
    public String convertLike(String type, String contentId, String accountId) {
        Like existingLike = null;
        switch (type) { // type에 따른 id 와 accountId로 좋아요 기록 찾음
            case "post":
                existingLike = likeRepository.findByPostIdAndAccountId(contentId, accountId);
                break;
            case "review":
                existingLike = likeRepository.findByReviewIdAndAccountId(contentId, accountId);
                break;
            case "comment":
                existingLike = likeRepository.findByCommentIdAndAccountId(contentId, accountId);
        }

        if (existingLike == null) { // 좋아요 없다면 좋아요 생성
            Like like = null;
            LocalDateTime dateTime = LocalDateTime.now();  // 현재시간을 등록시간으로 저장

            switch (type) {
                case "post":
                    like = Like.builder()
                            .postId(contentId)
                            .accountId(accountId)
                            .likeRegistrationDate(dateTime)
                            .build();
                    break;
                case "review":
                    like = Like.builder()
                            .reviewId(contentId)
                            .accountId(accountId)
                            .likeRegistrationDate(dateTime)
                            .build();
                    break;
                case "comment":
                    like = Like.builder()
                            .commentId(contentId)
                            .accountId(accountId)
                            .likeRegistrationDate(dateTime)
                            .build();
                    break;
            }
            likeRepository.save(like);
            /* 좋아요 누르면 count 1 증가 */

            return "add like success";
        } else {    // 좋아요 있다면 삭제
            likeRepository.delete(existingLike);
            /* 좋아요 취소하면 count 1 감소 */

            return "delete like success";
        }

    }
}
