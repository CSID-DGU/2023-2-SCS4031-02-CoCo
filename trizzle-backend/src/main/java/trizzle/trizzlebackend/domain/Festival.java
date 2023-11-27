package trizzle.trizzlebackend.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "festivals")
@Getter
@Setter
public class Festival {
    @Id
    private String id;
    private String region;
    private String startDate;
    private String endDate;
    private String name;
    private String image;
    private String homepage;
    private String contentId;
}
