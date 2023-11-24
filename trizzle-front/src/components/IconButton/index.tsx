import React, {useState, useEffect} from "react";
import * as S from "./IconButton.style";
import { IconButtonProps } from "./IconButton.type";
import { useAsync } from "../../utils/API/useAsync";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import {AiFillStar, AiOutlineStar} from 'react-icons/ai';

const IconButton: React.FC<IconButtonProps> = (props: IconButtonProps) => {
  const [isFilled, setIsFilled] = useState<boolean>(props.filled);
  const [state, fetchData] = useAsync({ url: "" });

  const onLike = () => {
    fetchData(`/api/${props.type}/${props.contentId}/likes`, "POST");
  }

  const onBookmark = () => {
    fetchData(`/api/${props.type}/${props.contentId}/bookmark`, "POST");
  };

  useEffect(() => {
    if(state.error) {
      alert("로그인이 필요합니다.");
    } else if(state.data){
      if(state.data.message === "add like success" || state.data.message === "add bookmark success") {
        setIsFilled(true);
      } else if(state.data.message === "delete like success" || state.data.message === "delete bookmark success") {
        setIsFilled(false);      }
    }
  },[state]);

  return (
    <S.BackButton onClick={props.icon === "like" ? onLike : onBookmark} type={props.icon}>
      {props.type === "comment" ? (
        isFilled ? <BiSolidLike className="thumb-icon"/> : <BiLike className="unthumb-icon"/>
      ) : ( 
        props.icon === "bookmark" ? (
          isFilled ? <AiFillStar size="1.5rem" /> : <AiOutlineStar size="1.5rem"/> ) : (
          isFilled ? <FcLike className="like-icon"/> : <FcLikePlaceholder className="unlike-icon"/>
      )
      )}
      
    </S.BackButton>
  )
}

export const OtherIconButton: React.FC<{children: React.ReactNode, onClick:()=>void}> = ({children, onClick}) => {
  return (
    <S.BackButton onClick={onClick}>
      {children}
    </S.BackButton>
  )
}

export default IconButton;