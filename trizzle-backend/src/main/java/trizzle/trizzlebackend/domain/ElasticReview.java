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
    private String planId;
    private String postId;
    private String postName;
    private String thumbnail;
    private Integer likeCount;

    public void setData(String id, String accountId, String reviewTitle, LocalDateTime reviewRegistrationDate,
                   LocalDate visitDate, Place place, String reviewContent, String planId, String postId,
                   String postName, String thumbnail, boolean reviewSecret){
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
    }
}
