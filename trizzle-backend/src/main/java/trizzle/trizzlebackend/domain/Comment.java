package trizzle.trizzlebackend.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "comments")
public class Comment {
    @Id
    private String id;
    private String accountId;
    private String postId;
    private String reviewId;
    private String parentId;
    private String commentContent;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime commentRegistrationDate;
    private boolean fix;
    private Integer commentLike;
    private boolean isDeleted;
    @Field("postInfo")
    private List<Post> postInfo;
    @Field("reviewInfo")
    private List<Review> reviewInfo;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public String getCommentContent() {
        return commentContent;
    }

    public void setCommentContent(String commentContent) {
        this.commentContent = commentContent;
    }

    public LocalDateTime getCommentRegistrationDate() {
        return commentRegistrationDate;
    }

    public void setCommentRegistrationDate(LocalDateTime commentRegistrationDate) {
        this.commentRegistrationDate = commentRegistrationDate;
    }

    public boolean isFix() {
        return fix;
    }

    public void setFix(boolean fix) {
        this.fix = fix;
    }

    public Integer getCommentLike() {
        return commentLike;
    }

    public void setCommentLike(Integer commentLike) {
        this.commentLike = commentLike;
    }

    public boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    public String getReviewId() {
        return reviewId;
    }

    public void setReviewId(String reviewId) {
        this.reviewId = reviewId;
    }

    public List<Post> getPostInfo() {
        return postInfo;
    }

    public void setPostInfo(List<Post> postInfo) {
        this.postInfo = postInfo;
    }

    public List<Review> getReviewInfo() {
        return reviewInfo;
    }

    public void setReviewInfo(List<Review> reviewInfo) {
        this.reviewInfo = reviewInfo;
    }

}
