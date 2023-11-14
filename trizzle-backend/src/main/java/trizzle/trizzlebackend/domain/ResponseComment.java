package trizzle.trizzlebackend.domain;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public class ResponseComment {
    private String id;
    private String accountId;
    private String profileImg;
    private String postId;
    private String parentId;
    private String commentContent;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime commentRegistrationDate;
    private boolean fix;
    private Integer commentLike;
    private boolean isDeleted;
}
