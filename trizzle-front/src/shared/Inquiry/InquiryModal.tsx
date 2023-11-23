import React from "react";
import Modal from "../../components/Modal";
import * as S from "./style";

interface Props {
  id: string;
  inquryContent: string;
  response: string;
  setOpen: () => void;
}

const InquiryModal: React.FC<Props> = (props: Props) => {
  return (
    <Modal title="답변" styleProps={{width:"30rem", height:"18rem"}} onCloseClick={props.setOpen}>
      <S.InquiryModalContainer>
        <S.HorizontalContainer>
          <S.QnA>Q</S.QnA>
          <S.InquiryModalText>{props.inquryContent}</S.InquiryModalText>
        </S.HorizontalContainer>
        <S.HorizontalContainer>
          <S.QnA>A</S.QnA>
          <S.InquiryModalText style={{backgroundColor:"#FFF7DA",  padding: "1rem 2rem"}}>{props.response}</S.InquiryModalText>
        </S.HorizontalContainer>
      </S.InquiryModalContainer>
    </Modal>
  );
};

export default InquiryModal;