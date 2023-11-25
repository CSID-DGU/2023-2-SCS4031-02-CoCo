package trizzle.trizzlebackend.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import trizzle.trizzlebackend.domain.Place;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(indexName = "reviews")
@Getter
@Setter
public class ElasticReview {
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
    private String reviewContentText;
    private String planId;
    private String postId;
    private String postName;
    private String thumbnail;
    private Integer likeCount;
    private Integer bookmarkCount;
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

    public void setData(String id, String accountId, String reviewTitle, LocalDateTime reviewRegistrationDate,
                   LocalDate visitDate, Place place, String reviewContent, String planId, String postId,
                   String postName, String thumbnail, boolean reviewSecret, Integer likeCount, Integer bookmarkCount, String reviewContentText){
        this.id = id;
        this.accountId = accountId;
        this.reviewTitle = reviewTitle;
        this.reviewRegistrationDate = reviewRegistrationDate;
        this.visitDate = visitDate;
        this.place = place;
        this.reviewContent = reviewContent;
        this.planId = planId;
        this.postId = postId;
        this.postName = postName;
        this.thumbnail = thumbnail;
        this.reviewSecret = reviewSecret;
        this.likeCount = likeCount;
        this.bookmarkCount = bookmarkCount;
        this.reviewContentText = reviewContentText;
    }
}
