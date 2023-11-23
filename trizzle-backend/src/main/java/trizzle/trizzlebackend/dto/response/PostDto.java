package trizzle.trizzlebackend.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import trizzle.trizzlebackend.domain.Post;

@Getter
@Setter
public class PostDto {
    private Post post;
    @JsonProperty("isLike")
    private boolean isLike;
    @JsonProperty("isBookmark")
    private boolean isBookmark;
}
