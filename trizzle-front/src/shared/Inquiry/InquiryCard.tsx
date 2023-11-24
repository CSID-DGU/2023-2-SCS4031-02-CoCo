import React, {useState} from "react";
import * as S from "./style";
import InquiryModal from "./InquiryModal";

interface Props {
  id: string;
  inquiryContent: string;
  response: string;
}

const InquiryCard: React.FC<Props> = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <S.CardContainer onClick={() => setOpen(!open)}>
      <S.CardText>Q.&nbsp;&nbsp;{props.inquiryContent}</S.CardText>
      {open && <InquiryModal id={props.id} inquryContent={props.inquiryContent} response={props.response} setOpen={() => setOpen(false)}/>
      }
    </S.CardContainer>
  );
};

export default InquiryCard;