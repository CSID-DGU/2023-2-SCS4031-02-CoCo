import React, {useEffect, useState} from 'react';
import * as S from './Comments.style';
import { CommentsProps, myCommentProps } from './Comments.type';
import {BsFillPinAngleFill} from 'react-icons/bs';
import ProfileImage from '../ProfileImage';
import {BiLike, BiSolidLike} from 'react-icons/bi';
import Menu from '../Menu';

const Comments:React.FC<CommentsProps> = (props: CommentsProps) => { 
  const [menuItems, setMenuItems] = useState<any[]>([])
  useEffect(() => {
    let menuItem:any[] = []; 
    if(props.isMe && props.postCommentData) {
      menuItem.push({content: "삭제", onClick: () => props.onDelete(props.postCommentData.id), isDelete: true});
    } else if(props.postCommentData && props.postCommentData.accountId === props.postCommentData.postAccountId){
      menuItem.push({content: "고정", onClick: () => props.onFix(props.postCommentData.id), isDelete: false});
    }

    setMenuItems(menuItem);
  }, []);

    if(props.postCommentData && props.postCommentData.isDeleted){
      return (
        <S.PostCommentContainer isReply={props.postCommentData.parentId === null? false : true}>
          <S.PostCommentContentBody>
            삭제된 댓글입니다.
          </S.PostCommentContentBody>
        </S.PostCommentContainer>
      )
    }else if(props.postCommentData) {
      return (
        <S.PostCommentContainer isReply={props.postCommentData.parentId === null? false : true}>
          <S.Fixed>
            <BsFillPinAngleFill size="0.8rem" color="#C5C5C5"/>
            고정됨
          </S.Fixed>
          {menuItems.length > 0 && <Menu item={menuItems}/>}
          <ProfileImage type='small'/>
          <S.PostCommentContentHeader>
            {props.postCommentData.nickname}
            <S.PostCommentContentDate>{props.postCommentData.registrationDate}</S.PostCommentContentDate>
          </S.PostCommentContentHeader>
          <S.PostCommentContentBody>
            {props.postCommentData.content}
          </S.PostCommentContentBody>
          <S.PostCommentContentFooter>
            {props.isLiked ? <BiSolidLike size="1rem" onClick={() => props.onLike(props.postCommentData.id)}/> : <BiLike size="1rem" onClick={() => props.onLike(props.postCommentData.id)}/>}
            <S.PostCommentContentFooterLike>{props.postCommentData.likeCount}</S.PostCommentContentFooterLike>
            {props.postCommentData.parentId === null && <S.PostCommentContentFooterReply onClick={() => props.onComment(props.postCommentData.id)}>답글</S.PostCommentContentFooterReply>}
          </S.PostCommentContentFooter>
        </S.PostCommentContainer>
      )
    }
}

export const MyComments:React.FC<myCommentProps> = (props: myCommentProps) => {
  return(
    <S.MyCommentContainer>
      <S.MyCommentContent>
        <S.MyCommentContentText>{props.myCommentData.content}</S.MyCommentContentText>
        <S.MyCommentPostText>{props.myCommentData.postName} | {props.myCommentData.registrationDate}</S.MyCommentPostText>
      </S.MyCommentContent>
      <S.MyCommentDeleteButton onClick={() => props.onDelete(props.myCommentData.id)}>삭제</S.MyCommentDeleteButton>
    </S.MyCommentContainer>
  )
}

export default Comments;
