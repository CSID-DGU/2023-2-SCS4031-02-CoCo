import React from "react";
import * as S from "./FestivalCard.style";
import DefaultFestival from "../../assets/images/default_festival.jpg"

type FestivalCardProps = {
  festival: festival;
  key: any;
};

type festival = {
  name: string;
  image: string;
  startDate: string;
  endDate: string;
  region: string;
  address: string;
  homepage: string;
};

const FestivalCard: React.FC<FestivalCardProps> = (props: FestivalCardProps) => {

  return (
    <a href={props.festival.homepage} target="_blank" rel="noreferrer" style={{textDecoration:"none"}}>
      <S.Container>
        <S.Tumbnail src={props.festival.image ==="" ?DefaultFestival : props.festival.image}/>
        <S.ContentContainer>
          <S.Title>{props.festival.name}</S.Title>
          <S.Date>{props.festival.startDate} ~ {props.festival.endDate}</S.Date>
          <S.Date>{props.festival.region}</S.Date>
        </S.ContentContainer>
      </S.Container>
    </a>
  )
};

export default FestivalCard;