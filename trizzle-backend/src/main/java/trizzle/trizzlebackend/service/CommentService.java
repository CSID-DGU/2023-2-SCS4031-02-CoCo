package trizzle.trizzlebackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import trizzle.trizzlebackend.controller.CommentController;
import trizzle.trizzlebackend.domain.*;
import trizzle.trizzlebackend.repository.CommentRepository;
import trizzle.trizzlebackend.repository.LikeRepository;
import trizzle.trizzlebackend.repository.PostRepository;

import java.time.LocalDateTime;
import java.util.*;

import static org.springframework.data.mongodb.core.aggregation.AddFieldsOperation.addField;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserService userService;
    //게시글 서비스 올라오면 그것도 가져옴
    private final PostService postService;
    private final ReviewService reviewService;
    private final NotificationService notificationService;
    private final LikeRepository likeRepository;

    public Comment insertComment(Comment comment, String accountId) {
        comment.setAccountId(accountId);
        LocalDateTime localDateTime = LocalDateTime.now();
        comment.setCommentRegistrationDate(localDateTime);
        comment.setCommentLike(0); //좋아요 0개
        comment.setFix(false);
        comment.setDeleted(false);
        Comment com = commentRepository.save(comment);

        Notification notification = new Notification();
        notification.setSendAccountId(accountId);
        notification.setForeignId(com.getId());

        if(comment.getPostId() == null) {
            notification.setContentId(comment.getReviewId());
            Review review = reviewService.findReview(comment.getReviewId());
            notification.setReceiveAccountId(review.getAccountId());
            notification.setContent(review.getReviewTitle());
            notification.setNotificationType("review-comment");
            if(comment.getParentId() != null) {
                Notification notification1 = notification;
                Comment comment1 = findComment(comment.getParentId());
                notification1.setReceiveAccountId(comment1.getAccountId());
                notification1.setNotificationType("review-comment-reply");
                notificationService.insertNotification(notification1);
            }
        } else {
            notification.setContentId(comment.getPostId());
            Post post = postService.findPost(comment.getPostId());
            notification.setReceiveAccountId(post.getAccountId());
            notification.setContent(post.getPostTitle());
            notification.setNotificationType("post-comment");
            if(comment.getParentId() != null) {
                Notification notification1 = notification;
                Comment comment1 = findComment(comment.getParentId());
                notification1.setReceiveAccountId(comment1.getAccountId());
                notification1.setNotificationType("post-comment-reply");
                notificationService.insertNotification(notification1);
            }
        }

        notificationService.insertNotification(notification);

        return com;
    };

    public Comment deleteComment(Comment comment) {
        comment.setDeleted(true);
        comment.setCommentContent("");
        notificationService.deleteNotification(comment.getId());
        //좋아요 테이블에서 해당 댓글에 좋아요 누른거 모두 삭제 로직 추가
        return commentRepository.save(comment);
    };

    public Comment searchComment(String commentId) {
        Optional<Comment> comment = commentRepository.findById(commentId);
        return comment.orElse(null);
    }

    private Map<String, Object> commentMap(Comment comment, String myAccount, String postAccountId) {
        Map<String, Object> newComment = new HashMap<>();
        String accountId = comment.getAccountId();
        String profileImg = userService.searchUser(accountId).getProfileImage();
        String userNick = userService.searchUser(accountId).getNickname();
        Like like = likeRepository.findByCommentIdAndAccountId(comment.getId(), myAccount);
        Boolean isMe = false;
        Boolean isLike;
        if(like == null) isLike = false;
        else isLike = true;

        //isLiked랑 postAccountId도 추가해줘야 함
        if (profileImg == null) profileImg = "";
        if (myAccount.equals(accountId)) isMe = true;
        newComment.put("commentData", comment);
        newComment.put("profileImg", profileImg);
        newComment.put("accountId", myAccount);
        newComment.put("isMe", isMe);
        newComment.put("nickname", userNick);
        newComment.put("postAccountId", postAccountId);
        newComment.put("isLike", isLike);

        return newComment;
    }

    public List<Object> findByPost(String postId, String myAccount) {
        List<Comment> comments = commentRepository.findByPostId(postId);
        List<Object> newComments = new ArrayList<>();
        String postAccountId = postService.findPost(postId).getAccountId();

        for(Comment comment: comments) { //각 댓글에 profileImg 추가
            String parentId = comment.getParentId();
            if(parentId == null && !comment.isDeleted()) {
                Map<String, Object> newComment = commentMap(comment, myAccount, postAccountId);
                List<Object> child = findByParent(comment.getId(), myAccount, postAccountId);
                newComment.put("childComment", child);
                newComments.add(newComment);
            } else {
                continue;
            }
        }
        return newComments;
    };

    public List<Object> findByParent(String parentId, String myAccount, String postAccountId) {
        List<Comment> comments = commentRepository.findByParentId(parentId);
        List<Object> newComments = new ArrayList<>();

        for(Comment comment: comments) { //각 댓글에 profileImg 추가
            Map<String, Object> newComment = commentMap(comment, myAccount, postAccountId);
            newComments.add(newComment);
        }
        return newComments;
    };

    public List<Object> findByReview(String reviewId, String myAccount) {
        List<Comment> comments = commentRepository.findByReviewId(reviewId);
        List<Object> newComments = new ArrayList<>();
        String postAccountId = reviewService.findReview(reviewId).getAccountId();

        for(Comment comment: comments) { //각 댓글에 profileImg 추가
            String parentId = comment.getParentId();
            if(parentId == null && !comment.isDeleted()) {
                Map<String, Object> newComment = commentMap(comment, myAccount, postAccountId);
                List<Object> child = findByParent(comment.getId(), myAccount, postAccountId);
                newComment.put("childComment", child);
                newComments.add(newComment);
            } else {
                continue;
            }
        }
        return newComments;
    };

   public List<Comment> findByAccount(String accountId) {
       List<Comment> myComments = commentRepository.findByAccountId(accountId);
       return myComments;
   };

   public Comment fixComment(String id) {
       Comment comment = searchComment(id);
       Boolean fixed = comment.isFix();
       if(fixed) comment.setFix(false);
       else comment.setFix(true);

       return commentRepository.save(comment);
   };

    public Comment findComment(String id) {
        Optional<Comment> optionalComment = commentRepository.findById(id);
        return optionalComment.orElse(null);
    }

}
