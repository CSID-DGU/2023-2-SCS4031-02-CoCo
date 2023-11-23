import React from "react";
import * as S from "./PlanCard.style";
import { PlanCardProps } from "./PlanCard.type";
import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import StaticMaps from "../KakaoMap/StaticMaps";

const PlanCard: React.FC<PlanCardProps> = (props: PlanCardProps) => {
  if (props.thema.length > 3) {
    props.thema.splice(3, props.thema.length - 3);
  }
  return (
    <Link to={`/post/plan/${props.planId}`}>
      <S.Container>
        <S.Thumbnail >
          {props.thumbnail === "" ?  <StaticMaps center={props.region} width="100%" height="17.5rem" /> : <S.ThumbnailImg src={props.thumbnail} />}

          <S.SiteBadge>{props.region}</S.SiteBadge>
          <S.LikeContainer>
            <AiFillHeart size="1.5rem" color="rgb(255,0,0)" />
            <S.LikeCount style={{ marginRight: "1rem" }}>{props.likeCount}</S.LikeCount>
            <BsChatDots size="1.3rem" color="#fff" />
            <S.LikeCount>{props.commentCount}</S.LikeCount>
          </S.LikeContainer>
        </S.Thumbnail>
        <S.Title>{props.title}</S.Title>
        <S.Date>{props.startDate} ~ {props.endDate}</S.Date>
        <S.ThemaContainer>
          {props.thema.map((item, index) => (
            <S.Thema key={index}>{item}</S.Thema>
          ))}
        </S.ThemaContainer>
      </S.Container>
    </Link>
  )
};

export default PlanCard;