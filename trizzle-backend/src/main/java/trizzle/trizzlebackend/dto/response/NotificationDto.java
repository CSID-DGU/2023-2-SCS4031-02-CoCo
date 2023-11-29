package trizzle.trizzlebackend.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import trizzle.trizzlebackend.domain.Notification;
import trizzle.trizzlebackend.domain.User;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
public class NotificationDto {
    private User user;
    private String notificationType;
    private String contentId;
    private String content;
    private Integer count;
    private LocalDateTime notificationRegistrationDate;
}
