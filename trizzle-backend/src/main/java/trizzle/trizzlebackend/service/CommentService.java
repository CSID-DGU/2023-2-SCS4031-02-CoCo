package trizzle.trizzlebackend.service;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.LookupOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;
import trizzle.trizzlebackend.controller.CommentController;
import trizzle.trizzlebackend.domain.Comment;
import trizzle.trizzlebackend.domain.Post;
import trizzle.trizzlebackend.domain.User;
import trizzle.trizzlebackend.repository.CommentRepository;
import trizzle.trizzlebackend.repository.PostRepository;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserService userService;
    //게시글 서비스 올라오면 그것도 가져옴
    private final PostService postService;
    private final ReviewService reviewService;
    private final MongoTemplate mongoTemplate;

    public CommentService(CommentRepository commentRepository, UserService userService, PostService postService, ReviewService reviewService, MongoTemplate mongoTemplate) {
        this.commentRepository = commentRepository;
        this.userService = userService;
        this.postService = postService;
        this.reviewService = reviewService;
        this.mongoTemplate = mongoTemplate;
    }

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

    private Map<String, Object> commentMap(Comment comment, String myAccount, String postAccountId) {
        Map<String, Object> newComment = new HashMap<>();
        String accountId = comment.getAccountId();
        String profileImg = userService.searchUser(accountId).getProfileImage();
        String userNick = userService.searchUser(accountId).getNickname();
        Boolean isMe = false;
        //isLiked랑 postAccountId도 추가해줘야 함
        if (profileImg == null) profileImg = "";
        if (myAccount.equals(accountId)) isMe = true;
        newComment.put("commentData", comment);
        newComment.put("profileImg", profileImg);
        newComment.put("accountId", myAccount);
        newComment.put("isMe", isMe);
        newComment.put("nickname", userNick);
        newComment.put("postAccountId", postAccountId);

        return newComment;
    }

    public List<Object> findByPost(String postId, String myAccount) {
        List<Comment> comments = commentRepository.findByPostId(postId);
        List<Object> newComments = new ArrayList<>();
        String postAccountId = postService.findPost(postId).getAccountId();

        for(Comment comment: comments) { //각 댓글에 profileImg 추가
            String parentId = comment.getParentId();
            if(parentId == null && !comment.getIsDeleted()) {
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
            if(parentId == null && !comment.getIsDeleted()) {
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
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.match(Criteria.where("accountId").is(accountId)),
                LookupOperation.newLookup()
                        .from("posts")
                        .localField("postId")
                        .foreignField("_id")
                        .as("postInfo"),
                LookupOperation.newLookup()
                        .from("reviews")
                        .localField("reviewId")
                        .foreignField("_id")
                        .as("reviewInfo")
        );

        AggregationResults<Comment> results = mongoTemplate.aggregate(aggregation, "comments", Comment.class);
        return results.getMappedResults();
   };

   public Comment fixComment(String id) {
       Comment comment = searchComment(id);
       Boolean fixed = comment.isFix();
       if(fixed) comment.setFix(false);
       else comment.setFix(true);

       return commentRepository.save(comment);
   };

}
