package trizzle.trizzlebackend.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
public enum ErrorCode {
    Unauthorized(401, "COMMON-ERROR-401", "로그인이 필요합니다"),
    NOT_FOUND(404,"COMMON-ERR-404","PAGE NOT FOUND"),
    INTER_SERVER_ERROR(500,"COMMON-ERR-500","INTER SERVER ERROR"),
    EMAIL_DUPLICATION(400,"MEMBER-ERR-400","EMAIL DUPLICATED"),
    ;
    private int status;
    private String errorCode;
    private String message;
};
