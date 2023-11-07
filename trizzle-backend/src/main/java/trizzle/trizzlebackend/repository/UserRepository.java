package trizzle.trizzlebackend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import trizzle.trizzlebackend.domain.User;

public interface UserRepository extends MongoRepository<User, String> {
    User findByAccountId(String accountId);
}
