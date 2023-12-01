package trizzle.trizzlebackend.dto.follow;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class FollowUserDto {
    private String accountId;
    private String nickname;
    private String profileImage;
}
