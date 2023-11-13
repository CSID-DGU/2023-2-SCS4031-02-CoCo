package trizzle.trizzlebackend.dto.upload;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class S3UploadResultDto {

    private String url;
    private String fileName;
    private long size;

    @Builder
    public S3UploadResultDto(String url, String fileName, long size) {
        this.url = url;
        this.fileName = fileName;
        this.size = size;
    }
}
