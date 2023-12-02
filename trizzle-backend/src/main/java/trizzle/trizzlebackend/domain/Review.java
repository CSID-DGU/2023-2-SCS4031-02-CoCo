package trizzle.trizzlebackend.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "reviews")
@Getter
@Setter
public class Review {
    @Id
    private String id;
    private String accountId;
    private String reviewTitle;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime reviewRegistrationDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate visitDate;
    private Place place;
    private String reviewContent;
    private boolean reviewSecret;
    private String planId;
    private String postId;
    private String postName;
    private String thumbnail;
    private String reviewContentText;
    private int likeCount;
    private int bookmarkCount;
    private int viewCount;
    private int commentCount;

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

    public void increaseCommentCounts() {
        this.commentCount++;
    }

    public void decreaseCommentCounts() {
        this.commentCount--;
    }

}
