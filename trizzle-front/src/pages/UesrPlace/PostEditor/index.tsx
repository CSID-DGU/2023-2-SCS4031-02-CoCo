import React, { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from "dompurify";


interface PostInputProps {
  onChangeContents: (content: string) => void;
  prevData: string;
}

export default function PostInput({ onChangeContents, prevData }: PostInputProps) {
  const [Data, setData] = useState<string>(prevData);

  useEffect(() => {
    const cleanHTML = sanitizeHTML(Data);
    handleContentChange(cleanHTML);// 변환해서 editor에 넣기
  }, []);

  const modules = {
    toolbar: {
      container: [
        [{ 'font': [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
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
    onChangeContents(htmlContent); // 내용 변경을 부모 컴포넌트로 전달
  };

  //html > 텍스트 변환
  const sanitizeHTML = (dirtyHTML: string) => {
    const cleanHTML = DOMPurify.sanitize(dirtyHTML);
    return { __html: cleanHTML };
  };

  return (
    <>
      <ReactQuill
        style={{ margin: "0 0 5rem 0 ", height: "50rem" }}
        modules={modules}
        theme='snow'
        onChange={handleContentChange}
        value={Data} // 초기 내용 표시
      />
    </>
  )
}