package trizzle.trizzlebackend.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "posts")
@Getter
@Setter
public class Post {
    @Id
    private String id;
    private String accountId;
    private String postTitle;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime postRegistrationDate;
    private boolean postSecret;
    private Plan plan;
    private int likeCount;
    private int bookmarkCount;
    private int viewCount;
    private String thumnail;

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

    public void increaseViewCounts() {
        this.viewCount++;
    }

}
