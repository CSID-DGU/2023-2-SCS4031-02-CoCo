package trizzle.trizzlebackend.service;

import org.springframework.stereotype.Service;
import trizzle.trizzlebackend.controller.CommentController;
import trizzle.trizzlebackend.domain.Comment;
import trizzle.trizzlebackend.domain.User;
import trizzle.trizzlebackend.repository.CommentRepository;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class CommentService {

    private CommentRepository commentRepository;
    private UserService userService;
    //게시글 서비스 올라오면 그것도 가져옴



    public Comment insertComment(Comment comment, String accountId) {
        comment.setAccountId(accountId);
        LocalDateTime localDateTime = LocalDateTime.now();
        comment.setCommentRegistrationDate(localDateTime);
        comment.setCommentLike(0); //좋아요 0개
        comment.setFix(false);
        comment.setIsDeleted(false);

        return commentRepository.save(comment);
    };

    public Comment deleteComment(Comment comment) {
        comment.setIsDeleted(true);
        comment.setCommentContent("");
        //좋아요 테이블에서 해당 댓글에 좋아요 누른거 모두 삭제 로직 추가
        return commentRepository.save(comment);
    };

    public Comment searchComment(String commentId) {
        Optional<Comment> comment = commentRepository.findById(commentId);
        return comment.orElse(null);
    }

    public List<Object> findByPost(String postId, String myAccount) {
        List<Comment> comments = commentRepository.findByPostId(postId);
        List<Object> newComments = new ArrayList<>();
        for(Comment comment: comments) { //각 댓글에 profileImg 추가
            Map<String, Object> newComment = new HashMap<>();
            String accountId = comment.getAccountId();
            String profileImg = userService.searchUser(accountId).getProfileImage();
            Boolean isMe = false;
            //isLiked랑 postAccountId도 추가해줘야 함
            if(profileImg == null) profileImg = "";
            if(myAccount == accountId) isMe = true;
            newComment.put("commentData", comment);
            newComment.put("profileImg", profileImg);
            newComment.put("accountId", myAccount);
            newComment.put("isMe", isMe);
            newComments.add(newComment);
        }
        return newComments;
    };

   public List<Comment> findByAccount(String accountId) {
       List<Comment> comments = commentRepository.findByAccountId(accountId);
       return comments;
   };
}
