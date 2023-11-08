import Modal from "../../components/Modal";
import React, {useState, useEffect} from "react";
import * as S from "./KeywordModal.style";
import res from "../../assets/keywords/res.svg"
import trans from "../../assets/keywords/trans.svg"
import rest from "../../assets/keywords/rest.svg"
import shopping from "../../assets/keywords/shopping.svg"

type modalProps = {
  onCloseClick: () => void;
  onAddButtonClick: (selectedKeyword: any, day:any) => void;
}

export const KeywordList: { keyword: string; src: string; }[] = [
  {keyword:"식사", src: res},
  {keyword:"이동", src: trans},
  {keyword:"휴식", src: rest},
  {keyword:"쇼핑", src: shopping},
];

const KeywordModal:React.FC<modalProps> = (props: modalProps) => {

  
  return (
    <Modal onCloseClick={props.onCloseClick} styleProps={{width:"47rem", height:"30rem"}} title="키워드 추가">
      <S.KeywordsContainer>
        {KeywordList.map((keyword, index) => (
          <S.KeywordContainer key={index} onClick={(day) => props.onAddButtonClick({keyword: keyword.keyword}, day)}>
            <S.KeywordImg src={keyword.src} alt="keywordImg"/>
            <S.KeywordTitle>{keyword.keyword}</S.KeywordTitle>
          </S.KeywordContainer>
        ))}
      </S.KeywordsContainer>

    </Modal>
  )



};

export default KeywordModal;