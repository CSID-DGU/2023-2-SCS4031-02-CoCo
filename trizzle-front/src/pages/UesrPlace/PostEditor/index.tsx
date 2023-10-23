import React, { useEffect, useState } from "react";
import { BiCameraOff } from "react-icons/bi";
import ReactQuill from 'react-quill';
import DOMPurify from "dompurify";
import 'react-quill/dist/quill.snow.css';


import * as S from "./PostEditor.styles";

interface PostInputProps {
  onChangeContents: (content: string) => void;
  onThumbnailImages: (content: string) => void;
  prevData: string;
}

export default function PostInput({ onChangeContents, onThumbnailImages, prevData }: PostInputProps) {
  const [Data, setData] = useState<string>(prevData);
  const [thumbnailImages, setThumbnailImages] = useState<string[]>([]);
  const [clickedImage, setClickedImage] = useState<string>('');
  const [clickedImageHtml, setClickedImageHtml] = useState<string>('');

  useEffect(() => {
    const cleanHTML = sanitizeHTML(Data);
    handleContentChange(cleanHTML); // 변환해서 editor에 넣기
  }, []);

  useEffect(() => {
    onThumbnailImages(clickedImageHtml);
  }, [clickedImageHtml]);

  const setSelectImage = (idx: number) => {
    const selectedImage = thumbnailImages[idx]; // 선택한 이미지 URL 가져오기
    setClickedImage(selectedImage);
    const imgTag = `<img src="${selectedImage}" alt="Image ${idx}" />`; // 이미지 태그 생성
    setClickedImageHtml(imgTag); // 선택한 이미지를 상태에 저장
  }

  const modules = {
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
    },
  };

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
