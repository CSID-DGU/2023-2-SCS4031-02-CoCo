import { useEffect, useState } from "react";
import * as S from "./style";
import Modal from "../../components/Modal";
import { useAsync } from "../../utils/API/useAsync";

const PostInquiryModal: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [state, fetchData] = useAsync({ url: "" });
  const [value, setValue] = useState<string>("");

  const onSummit = () => {
    if(value === "") {
      alert("내용을 입력해주세요");
      return;
    }
    fetchData("/api/inquiries/", "POST", {inquiryContent: value});
  }

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  }

  useEffect(() => {
    if(state.error) {
      alert("로그인이 필요합니다.");
    } else if(state.data) {
      if(state.data.message === "success") {
        alert("문의가 성공적으로 등록되었습니다");
        setOpen(false);
      }
    }
  }, [state])

  return (
    <>
    <S.InquiryButton onClick={() => setOpen(true)}>문의하기</S.InquiryButton>
    {open &&
    <Modal title="문의하기" styleProps={{width:"30rem", height:"25rem"}} onCloseClick={() => setOpen(false)}>
      <S.InquiryModalContainer>
      <S.InquiryInputArea 
      placeholder="문의 내용 혹은 개선했으면 하는 사항을 입력해주세요"
      rows={5}
      value={value}
      onChange={onChange}
      />
        <S.ButtonArea>
          <S.SummitButton onClick={onSummit}>제출</S.SummitButton>
          <S.CancelButton onClick={() => setOpen(false)}>취소</S.CancelButton>
        </S.ButtonArea>
      </S.InquiryModalContainer>
    </Modal>
    }
    </>
  )
};

export default PostInquiryModal;