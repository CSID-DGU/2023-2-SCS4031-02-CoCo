import { useState, useEffect } from "react";
import Page from "../Page";
import InquiryCard from "../../shared/Inquiry/InquiryCard";
import PostInquiryModal from "../../shared/Inquiry/PostInquiryModal";
import * as S from "./FQA.style";
import { useAsync } from "../../utils/API/useAsync";

const FQA = () => {
  const [faqList, setFaqList] = useState<any>(null);
  const [state, ] = useAsync({ url: "/api/inquiries/" });

  useEffect(() => {
    if (state.error) {
      console.error(state.error);
      alert("데이터를 불러오는 데 실패했습니다");
    } else if (state.data) {
      setFaqList(state.data);
    }
  }, [state]);

  return(
    <Page headersProps={{ isHome: false }}>
      <S.Container>
        <S.Banner>고객센터</S.Banner>
        <div style={{height: "10rem"}} />
          <PostInquiryModal />
          <S.Title>도움말 및 건의사항</S.Title>

        <S.GridContainer>
          {faqList && faqList.map((inquiry: any) => (
            <InquiryCard {...inquiry} key={inquiry.id}/>
          ))}
        </S.GridContainer>
      </S.Container>
    </Page>
  )

};

export default FQA;