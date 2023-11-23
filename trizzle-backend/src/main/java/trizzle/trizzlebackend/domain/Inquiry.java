package trizzle.trizzlebackend.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "inquiries")
@Getter
@Setter
public class Inquiry {
    @Id
    private String id;
    private String inquiryContent;
    private String response;
//    private String accountId;
}
