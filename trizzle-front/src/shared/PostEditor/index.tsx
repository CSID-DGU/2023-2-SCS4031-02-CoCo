import React, { useEffect, useMemo, useRef, useState } from "react";
import { BiCameraOff } from "react-icons/bi";
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ImageResize, Resize } from "quill-image-resize-module-ts";
import DOMPurify from "dompurify";
import AWS from "aws-sdk";

import * as S from "./PostEditor.styles";
import axios from "axios";

type PostInputProps = {
  onChangeContents: (content: string) => void;
  onThumbnailImages: (content: string) => void;
  prevData: string;
}

Quill.register('modules/ImageResize', ImageResize);

export const PostInput: React.FC<PostInputProps> = ({ onChangeContents, onThumbnailImages, prevData }: PostInputProps) => {
  const quillRef = useRef(null);
  const [Data, setData] = useState<string>(prevData);
  const [thumbnailImages, setThumbnailImages] = useState<string[]>([]);
  const [clickedImage, setClickedImage] = useState<string>('');
  const [clickedImageHtml, setClickedImageHtml] = useState<string>('')

  // localhost를 서버 IP로 변경하면 됨
  const url = `http://localhost:8080`;

  const imageHandler = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      //이미지를 담아 전송할 formData를 만든다
      const file = input.files?.[0] || undefined;
      const fileName = file.name;
      const fileSize = file.size;

      // 3GB가 넘어가는 파일 업로드 제한
      if (fileSize > 3 * 1024 * 1024 * 1024) {
        alert('The file you are trying to upload is too large. (under 3GB)');
        return;
      }

      try {
        //업로드할 파일의 이름으로 Date 사용
        let start = new Date();
        //s3 관련 설정들
        
        let res = await axios.post(`${url}/upload/initiate`, { fileName: fileName });
        const uploadId = res.data.uploadId;
        const newFilename = res.data.fileName; // 서버에서 생성한 새로운 파일명
        console.log(res);

        // 세션 스토리지에 업로드 아이디와 파일 이름을 저장합니다.
        sessionStorage.setItem('uploadId', uploadId);
        sessionStorage.setItem('fileName', newFilename);

        // 청크 사이즈와 파일 크기를 통해 청크 개수를 설정합니다.
        const chunkSize = 10 * 1024 * 1024; // 10MB
        const chunkCount = Math.floor(fileSize / chunkSize) + 1;
        console.log(`chunkCount: ${chunkCount}`);

        let multiUploadArray = [];
        let end; 
        for (let uploadCount = 1; uploadCount < chunkCount + 1; uploadCount++) {
          // 청크 크기에 맞게 파일을 자릅니다.
          start = (uploadCount - 1) * chunkSize;
          end = uploadCount * chunkSize;
          let fileBlob = uploadCount < chunkCount ? file.slice(start, end) : file.slice(start);

          // 3. Spring Boot 서버로 Part 업로드를 위한 미리 서명된 URL 발급 바듭니다.
          let getSignedUrlRes = await axios.post(`${url}/upload/preSignedUrl`, {
            fileName: newFilename,
            partNumber: uploadCount,
            uploadId: uploadId
          });

          let preSignedUrl = getSignedUrlRes.data.preSignedUrl;
          console.log(`preSignedUrl ${uploadCount} : ${preSignedUrl}`);
          console.log(fileBlob);

          // 3번에서 받은 미리 서명된 URL과 PUT을 사용해 AWS 서버에 청크를 업로드합니다,
          let uploadChunck = await fetch(preSignedUrl, {
            method: 'PUT',
            body: fileBlob
          });
          console.log(uploadChunck);
          // 응답 헤더에 있는 Etag와 파트 번호를 가지고 있습니다.
          let EtagHeader = uploadChunck.headers.get('ETag').replaceAll('\"', '');
          console.log(EtagHeader);
          let uploadPartDetails = {
            awsETag: EtagHeader,
            partNumber: uploadCount
          };

          multiUploadArray.push(uploadPartDetails);
        }

        console.log(multiUploadArray);
        // 6. 모든 청크 업로드가 완료되면 Spring Boot 서버로 업로드 완료 요청을 보냅니다.
        // 업로드 아이디 뿐만 아니라 이 때 Part 번호와 이에 해당하는 Etag를 가진 'parts'를 같이 보냅니다.
        const completeUpload = await axios.post(`${url}/upload/complete`, {
          fileName: newFilename,
          parts: multiUploadArray,
          uploadId: uploadId
        });
        end = new Date();
        console.log("파일 업로드 하는데 걸린 시간 : " + (end - start) + "ms")
        console.log(completeUpload.data.url, ' 업로드 완료 응답값');
      } catch (err) {
        console.log(err, err.stack);
      }
    });
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ 'font': [] }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'align': [] }, 'bold', 'italic', 'underline', 'strike', { 'color': [] }, { 'background': [] }],
          ['image'],
          ['blockquote', 'code-block'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }, { indent: "-1" }, { indent: "+1" }],
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  useEffect(() => {
    const cleanHTML: any = sanitizeHTML(Data);
    handleContentChange(cleanHTML); // 변환해서 editor에 넣기
  }, []);

  useEffect(() => {
    console.log(Data);
  }, [Data]);

  useEffect(() => {
    onThumbnailImages(clickedImageHtml);
  }, [clickedImageHtml]);

  // 내용이 변경될 때 호출되는 함수
  const handleContentChange = (htmlContent: string) => {
    setData(htmlContent);
    findAndSetImages(htmlContent);
    onChangeContents(htmlContent);
  };

  // HTML에서 이미지를 찾아서 이미지 목록 업데이트
  const findAndSetImages = (htmlContent: string) => {
    if (typeof htmlContent !== 'string') {
      return; // 문자열이 아닌 경우 처리하지 않음
    }

    const imgTags = htmlContent.match(/<img.*?src=['"](.*?)['"]/gi);
    if (imgTags) {
      const imageSrcList = imgTags.map((imgTag) => {
        const srcMatches = imgTag.match(/src=['"](.*?)['"]/i);
        if (srcMatches && srcMatches[1]) {
          return srcMatches[1];
        }
        return '';
      });
      setThumbnailImages(imageSrcList);
    } else {
      setThumbnailImages([]);
      setClickedImage('')
      setClickedImageHtml('')
    }
  };

  // HTML > 텍스트 변환
  const sanitizeHTML = (dirtyHTML: string) => {
    const cleanHTML = DOMPurify.sanitize(dirtyHTML);
    return { __html: cleanHTML };
  };

  return (
    <div className="editorContainer">
      <ReactQuill
        style={{ margin: "0 0 3rem 0", height: "30rem" }}
        modules={modules}
        theme='snow'
        onChange={handleContentChange}
        value={Data} // 초기 내용 표시
        placeholder="당신의 추억을 공유해보세요."
      />
      <S.ImageList>
        <S.ImageListText>첨부된 이미지 목록 {thumbnailImages.length}</S.ImageListText>
        <S.ImageButtonList>
          {clickedImage != '' && (
            <S.SelectImagecontainer>
              <S.SelectImageComponent src={clickedImage} alt={`SelectImage`} />
            </S.SelectImagecontainer>
          )}
          {thumbnailImages.length > 0 ? (
            thumbnailImages.map((imgSrc, index) => (
              <S.ImageButton
                key={index}
                onClick={(e) => {
                  e.preventDefault(); // 기본 동작 중단
                  setSelectImage(index);
                }}
              >
                <S.ImageComponent src={imgSrc} alt={`Image ${index}`} />
              </S.ImageButton>
            ))
          ) : (
            <S.EmptyImage>
              <BiCameraOff style={{ width: "1.5rem", height: "1.5rem" }} />
            </S.EmptyImage>
          )}
        </S.ImageButtonList>
      </S.ImageList>
    </div>
  )
}

export default PostInput;

// const [Data, setData] = useState<string>(prevData);
// const [thumbnailImages, setThumbnailImages] = useState<string[]>([]);
// const [clickedImage, setClickedImage] = useState<string>('');
// const [clickedImageHtml, setClickedImageHtml] = useState<string>('');

// useEffect(() => {
//   const cleanHTML = sanitizeHTML(Data);
//   handleContentChange(cleanHTML); // 변환해서 editor에 넣기
// }, []);

// useEffect(() => {
//   console.log(Data);
// }, [Data]);

// useEffect(() => {
//   onThumbnailImages(clickedImageHtml);
// }, [clickedImageHtml]);


// // const modules = useMemo(() => {
// //   return {
// //     toolbar: {
// //       container: [
// //         [{ 'font': [] }],
// //         [{ 'size': ['small', false, 'large', 'huge'] }],
// //         [{ 'align': [] }, 'bold', 'italic', 'underline', 'strike', { 'color': [] }, { 'background': [] }],
// //         ['image'],
// //         ['blockquote', 'code-block'],
// //         [{ 'list': 'ordered' }, { 'list': 'bullet' }, { indent: "-1" }, { indent: "+1" }],
// //         ['clean'],
// //       ],
// //       imageResize: {
// //         displaySize: true,
// //       }
// //     },
// //   };
// // }, []);

// const modules = useMemo(() => {
//   return {
//     toolbar: {
//       container: [
//         [{ 'font': [] }],
//         [{ 'size': ['small', false, 'large', 'huge'] }],
//         [{ 'align': [] }, 'bold', 'italic', 'underline', 'strike', { 'color': [] }, { 'background': [] }],
//         ['image'],
//         ['blockquote', 'code-block'],
//         [{ 'list': 'ordered' }, { 'list': 'bullet' }, { indent: "-1" }, { indent: "+1" }],
//         ['clean'],
//       ],
//       ImageResize: {
//         modules: [Resize],
//       },
//     },
//   }
// }, []);

// // 내용이 변경될 때 호출되는 함수
// const handleContentChange = (htmlContent: string) => {
//   setData(htmlContent);
//   findAndSetImages(htmlContent);
//   onChangeContents(htmlContent);
// };

// // HTML에서 이미지를 찾아서 이미지 목록 업데이트
// const findAndSetImages = (htmlContent: string) => {
//   if (typeof htmlContent !== 'string') {
//     return; // 문자열이 아닌 경우 처리하지 않음
//   }

//   const imgTags = htmlContent.match(/<img.*?src=['"](.*?)['"]/gi);
//   if (imgTags) {
//     const imageSrcList = imgTags.map((imgTag) => {
//       const srcMatches = imgTag.match(/src=['"](.*?)['"]/i);
//       if (srcMatches && srcMatches[1]) {
//         return srcMatches[1];
//       }
//       return '';
//     });
//     setThumbnailImages(imageSrcList);
//   } else {
//     setThumbnailImages([]);
//     setClickedImage('')
//     setClickedImageHtml('')
//   }
// };

// // HTML > 텍스트 변환
// const sanitizeHTML = (dirtyHTML: string) => {
//   const cleanHTML = DOMPurify.sanitize(dirtyHTML);
//   return { __html: cleanHTML };
// };