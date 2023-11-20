package trizzle.trizzlebackend.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "comments")
@Getter
@Setter
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
    private int likeCount;

    public void increaseLikes() {   // 좋아요 수 증가
        this.likeCount++;
    }
    public void decreaseLikes() {   // 좋아요 수 감소
        this.likeCount--;
    }
}
