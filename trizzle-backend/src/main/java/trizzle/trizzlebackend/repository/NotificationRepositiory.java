package trizzle.trizzlebackend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import trizzle.trizzlebackend.domain.Notification;

import java.util.List;

public interface NotificationRepositiory extends MongoRepository<Notification, Long> {

    Notification findById(String id);
    List<Notification> findByReceiveAccountIdAndNotificationCheck(String receiveAccountId, boolean check);

    List<Notification> findByReceiveAccountIdAndContentId(String receiveAccountId, String contentId);

    void deleteByForeignIdAndNotificationCheck(String foreignId, boolean check);
}
