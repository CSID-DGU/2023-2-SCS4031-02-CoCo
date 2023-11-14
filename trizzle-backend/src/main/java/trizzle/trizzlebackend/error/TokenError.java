package trizzle.trizzlebackend.error;

import lombok.Getter;

@Getter
public class TokenError extends RuntimeException {
    private ErrorCode errorCode;

    public TokenError(String message, ErrorCode errorCode) {
        super(message);
        this.errorCode = errorCode;
    }
  
}
