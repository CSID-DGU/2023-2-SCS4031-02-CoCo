package trizzle.trizzlebackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import trizzle.trizzlebackend.domain.Notification;
import trizzle.trizzlebackend.dto.response.NotificationDto;
import trizzle.trizzlebackend.repository.NotificationRepositiory;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepositiory notificationRepositiory;
    private final UserService userService;

    public String insertNotification(Notification notification) {
        LocalDateTime dateTime = LocalDateTime.now();
        notification.setNotificationRegistrationDate(dateTime);
        notification.setNotificationCheck(false);
        if(notification.getSendAccountId().equals(notification.getReceiveAccountId())) {
            return "same user";
        }
        notificationRepositiory.save(notification);
        return "success";
    }

    public List<Notification> findUserNotification(String accountId) {
        List<Notification> nonCheck = notificationRepositiory.findByReceiveAccountIdAndNotificationCheck(accountId, false);

        return nonCheck;
    }

    public List<NotificationDto> responseNotification(String accountId){
        List<NotificationDto> response = new ArrayList<>();
        List<Notification> list = findUserNotification(accountId);
        Map<String, List<Notification>> temp = new HashMap<>();

        for (Notification notification : list) {
            String contentId = notification.getContentId(); // 게시글 ID를 가져옴
            String type = notification.getNotificationType();
            String key = contentId + type;
            List<Notification> groupedList = temp.computeIfAbsent(key, k -> new ArrayList<>());
            groupedList.add(notification);
        };

        for(List<Notification> notifications: temp.values()) {
            Notification notification = notifications.get(0);
            NotificationDto notificationDto = NotificationDto.builder()
                    .user(userService.searchUser(notification.getSendAccountId()))
                    .notificationType(notification.getNotificationType())
                    .count(notifications.size())
                    .contentId(notification.getContentId())
                    .content(notification.getContent())
                    .notificationRegistrationDate(notification.getNotificationRegistrationDate())
                    .build();

            response.add(notificationDto);
        }

        return response;
    }

    public Notification findById(String id) {
        return notificationRepositiory.findById(id);
    }

    public String updateNotification(String accountId) {
        List<Notification> notifications = findUserNotification(accountId);
        for(Notification notification: notifications) {
            notification.setNotificationCheck(true);
            notificationRepositiory.save(notification);
        }
        return "success";
    }

    public String deleteNotification(String foreignId) {
        notificationRepositiory.deleteByForeignIdAndNotificationCheck(foreignId, false);
        return "success";
    }
}
