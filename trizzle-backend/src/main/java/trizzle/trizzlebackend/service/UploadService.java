package trizzle.trizzlebackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedUploadPartRequest;
import software.amazon.awssdk.services.s3.presigner.model.UploadPartPresignRequest;
import trizzle.trizzlebackend.dto.upload.*;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UploadService {

    private final S3Client s3Client;
    private final S3Presigner s3Presigner;

    @Value("${cloud.aws.s3.bucket}")
    private String targetBucket;
    @Value("${cloud.aws.cloufront.url}")
    private String cloutFrontUrl;

    /*MultipartUpload 시작 시 UloadID S3에서 받아옴 */
    public S3UploadDto initiateUpload(String originFileName, String targetObjectDir) {

        String randomUUID = UUID.randomUUID().toString();
        String newFileName = randomUUID + "_" + originFileName; // 파일이름 중복방지 위해 파일명에 UUID 추가
        Instant now = Instant.now();

        CreateMultipartUploadRequest createMultipartUploadRequest = CreateMultipartUploadRequest.builder()
                .bucket(targetBucket)   // 버킷 설정
                .key(targetObjectDir + "/" + newFileName)   // 업로드될 경로 설정
                .acl(ObjectCannedACL.PUBLIC_READ)   // public_read로 acl 설정
                .expires(now.plusSeconds(60 * 20))  // 객체를 더 이상 캐시할 수 없는 날짜 및 시간
                .contentType("image/jpeg")
                .build();

        // Amazon S3는 MultiPart Upload에 대한 고유 식별자인 UploadID가 포함된 응답을 반환
        CreateMultipartUploadResponse createMultipartUploadResponse = s3Client.createMultipartUpload(createMultipartUploadRequest);

        return new S3UploadDto(createMultipartUploadResponse.uploadId(), newFileName);
    }

    /*presignedUrl 발급*/
    public S3PresignedUrlDto getPreSignedUrl(S3UploadSignedUrlDto s3UploadSignedUrlDto, String targetObjectDir) {

        UploadPartRequest uploadPartRequest = UploadPartRequest.builder()   // uploadId, partNumber 값을 포함해서 요청
                .bucket(targetBucket)
                .key(targetObjectDir + "/" + s3UploadSignedUrlDto.getFileName())
                .uploadId(s3UploadSignedUrlDto.getUploadId())
                .partNumber(s3UploadSignedUrlDto.getPartNumber())
                .build();

        // presignedUrl 요청
        UploadPartPresignRequest uploadPartPresignRequest = UploadPartPresignRequest.builder()
                .signatureDuration(Duration.ofMinutes(10))
                .uploadPartRequest(uploadPartRequest)
                .build();

        PresignedUploadPartRequest presignedUploadPartRequest = s3Presigner.presignUploadPart(uploadPartPresignRequest);

        return new S3PresignedUrlDto(presignedUploadPartRequest.url().toString());
    }

    /*MultiPart Upload 요청 완료*/
    public S3UploadResultDto completeUpload(S3UploadCompleteDto s3UploadCompleteDto, String targetObjectDir) {
        List<CompletedPart> completedParts = new ArrayList<>();

        // 한 이미지 파일에 대해 나눠서 저장했던 부분들에 대해 partNumber,Etag 모음
        for (S3UploadPartDetailDto partForm : s3UploadCompleteDto.getParts()) {
            CompletedPart part = CompletedPart.builder()
                    .partNumber(partForm.getPartNumber())
                    .eTag(partForm.getAwsETag())
                    .build();
            completedParts.add(part);
        }

        // 멀티파트 업로드 완료 요청을 AWS 서버에 보냄(completedParts 포함해서)
        CompletedMultipartUpload completedMultipartUpload = CompletedMultipartUpload.builder()
                .parts(completedParts)
                .build();

        String fileName = s3UploadCompleteDto.getFileName();
        CompleteMultipartUploadRequest completeMultipartUploadRequest = CompleteMultipartUploadRequest.builder()
                .bucket(targetBucket)
                .key(targetObjectDir + "/" + fileName)
                .uploadId(s3UploadCompleteDto.getUploadId())
                .multipartUpload(completedMultipartUpload)
                .build();

        CompleteMultipartUploadResponse completeMultipartUploadResponse = s3Client.completeMultipartUpload(completeMultipartUploadRequest);

        String objectKey = completeMultipartUploadResponse.key();    //s3 업로드된 파일이름
//        String url = s3Client.utilities().getUrl(builder -> builder.bucket(targetBucket).key(objectKey)).toString(); // s3 bucket에 저장된 파일의 url
        String url = cloutFrontUrl + fileName;  // cloudfront 이용함 (이미지 불러올 떄 cloud front활용)
        String bucket = completeMultipartUploadResponse.bucket();
        long fileSize = getFileSizeFromS3Url(bucket, objectKey);

        return S3UploadResultDto.builder()
                .fileName(fileName)
                .url(url)
                .size(fileSize)
                .build();
    }


    private long getFileSizeFromS3Url(String bucketName, String fileName) {
        HeadObjectResponse headObjectResponse = s3Client.headObject(
                HeadObjectRequest.builder()
                        .bucket(bucketName)
                        .key(fileName)
                        .build()
        );
        return headObjectResponse.contentLength();
    }
}
