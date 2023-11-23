package trizzle.trizzlebackend.dto.response;

import lombok.Getter;
import lombok.Setter;
import trizzle.trizzlebackend.domain.Post;

@Getter
@Setter
public class PostDto {
    private Post post;
    private boolean isLike;
}
