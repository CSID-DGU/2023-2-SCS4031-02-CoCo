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
};

const FestivalCard: React.FC<FestivalCardProps> = (props: FestivalCardProps) => {

  return (
    <S.Container>
      <S.Tumbnail src={props.festival.image ==="" ?DefaultFestival : props.festival.image}/>
      <S.ContentContainer>
        <S.Title>{props.festival.name}</S.Title>
        <S.Date>{props.festival.startDate} ~ {props.festival.endDate}</S.Date>
        <S.Date>{props.festival.region} {props.festival.address.split(" ")[1]}</S.Date>
      </S.ContentContainer>
    </S.Container>
  )
};

export default FestivalCard;