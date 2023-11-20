package trizzle.trizzlebackend.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import trizzle.trizzlebackend.domain.Plan;

import java.time.LocalDateTime;

@Document(indexName = "posts")
@Getter
@Setter
public class ElasticPost {
    @Id
    private String id;
    private String accountId;
    private String postTitle;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime postRegistrationDate;
    private Integer likeCount;
    private boolean postSecret;
    private Plan plan;

    public void setData(String id, String accountId, String postTitle, LocalDateTime postRegistrationDate,
                        boolean postSecret, Plan plan) {
        this.id = id;
        this.accountId = accountId;
        this.postTitle = postTitle;
        this.postRegistrationDate = postRegistrationDate;
        this.postSecret = postSecret;
        this.plan = plan;
    }
}