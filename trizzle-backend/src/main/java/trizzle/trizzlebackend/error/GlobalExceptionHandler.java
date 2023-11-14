package trizzle.trizzlebackend.error;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
@ControllerAdvice
public class GlobalExceptionHandler{

    //토큰이 없을 때 로그인이 필요합니다 반환하는 처리
    @ExceptionHandler(TokenError.class)
    public ResponseEntity<ErrorResponse> handelTokenError(TokenError te) {
        log.error("token error", te);
        ErrorResponse response = new ErrorResponse(te.getErrorCode());
        return new ResponseEntity<>(response,HttpStatus.valueOf(te.getErrorCode().getStatus()));
    }

}
