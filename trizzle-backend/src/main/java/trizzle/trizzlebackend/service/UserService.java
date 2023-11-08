package trizzle.trizzlebackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import trizzle.trizzlebackend.repository.UserRepository;
import trizzle.trizzlebackend.domain.User;

import java.util.Optional;

@Service
@RequiredArgsConstructor

public class UserService {

    private final UserRepository userRepository;

    public User searchUser(String accountId) { //accountId로 유저 검색, 없으면 null return
        Optional<User> userOptional = Optional.ofNullable(userRepository.findByAccountId(accountId));
        return userOptional.orElse(null);
    };

    public User updateUser(User user) {
        return userRepository.save(user);
    };

}
