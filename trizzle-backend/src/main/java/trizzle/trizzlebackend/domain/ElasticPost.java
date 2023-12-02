package trizzle.trizzlebackend.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import software.amazon.awssdk.services.s3.endpoints.internal.Value;
import trizzle.trizzlebackend.domain.Plan;

import java.time.LocalDateTime;

@Document(indexName = "posts")
@Getter
@Setter
public class ElasticPost {
    @Id
    private String id;
    @Field(type= FieldType.Auto)
    private String accountId;
    @Field(type= FieldType.Text)
    private String postTitle;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime postRegistrationDate;
    private Integer likeCount;
    private boolean postSecret;
    @Field(type= FieldType.Object)
    private Plan plan;
    private String thumnail;
    private Integer bookmarkCount;
    private Integer commentCount;

    public void increaseLikes() {   // 좋아요 수 증가
        this.likeCount++;
    }
    public void decreaseLikes() {   // 좋아요 수 감소
        this.likeCount--;
    }

    public void increaseBookmarks() {
        this.bookmarkCount++;
    }

    public void decreaseBookmarks() {
        this.bookmarkCount--;
    }

    public void setData(String id, String accountId, String postTitle, LocalDateTime postRegistrationDate,
                        boolean postSecret, Plan plan, Integer likeCount, Integer bookmarkCount, String thumnail, Integer commentCount) {
        this.id = id;
        this.accountId = accountId;
        this.postTitle = postTitle;
        this.postRegistrationDate = postRegistrationDate;
        this.postSecret = postSecret;
        this.plan = plan;
        this.likeCount = likeCount;
        this.bookmarkCount = bookmarkCount;
        this.thumnail = thumnail;
        this.commentCount = commentCount;
    }
}
