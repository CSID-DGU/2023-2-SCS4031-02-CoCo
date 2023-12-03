package trizzle.trizzlebackend.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "notifications")
@Getter
@Setter
public class Notification {
    @Id
    private String id;
    private String notificationType;
    private String sendAccountId;
    private String receiveAccountId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime notificationRegistrationDate;
    private Boolean notificationCheck;
    private String contentId;
    private String foreignId;
    private String content;
}
