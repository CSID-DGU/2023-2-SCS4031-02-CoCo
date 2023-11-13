import React from "react";
import * as S from "./PlaceCard.style";
import { PlaceCardProps } from "./PlaceCard.type";
import { BiSolidMap } from "react-icons/bi";
import { Link } from "react-router-dom";
import logo from '../../assets/logo/nonTextLogo.svg'

const PlaceCard: React.FC<PlaceCardProps> = (props: PlaceCardProps) => {

  return (
    <Link to={`/post/places/${props.postId}`}>
      <S.Container>
        <S.LeftContainer>
          <S.HorizontalContainer>
            <BiSolidMap size="1.3rem" color="#FFE500" />
            <S.Site>{props.placeName}</S.Site>
          </S.HorizontalContainer>
          <S.Title>{props.postTitle}</S.Title>
          <S.Site>{props.userName} | {props.postDate}</S.Site>
          <S.Content>{props.postContent}</S.Content>
        </S.LeftContainer>
        {props.src === '' ? (
          <S.NonoThumbnailContainer>
            <S.NonoThumbnail src={logo} alt="thumbnail" />
          </S.NonoThumbnailContainer>
        ) : (
          <S.Thumbnail src={props.src} alt="thumbnail" />
        )}
      </S.Container>
    </Link>
  )
};

export default PlaceCard;