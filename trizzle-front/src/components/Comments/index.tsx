import React, {useEffect, useState} from 'react';
import * as S from './Comments.style';
import { CommentsProps, myCommentProps } from './Comments.type';
import {BsFillPinAngleFill} from 'react-icons/bs';
import ProfileImage from '../ProfileImage';
import {BiLike, BiSolidLike} from 'react-icons/bi';
import {AiFillCaretDown, AiFillCaretUp} from 'react-icons/ai';
import Menu from '../Menu';


const Comment:React.FC<CommentsProps> = (props: CommentsProps) => { 
  const [menuItems, setMenuItems] = useState<any[]>([]);

  useEffect(() => {
    let menuItem:any[] = []; 
    if(props.commentData.isMe && props.commentData.postCommentData) {
      menuItem.push({content: "삭제", onClick: () => props.onDelete(props.commentData.postCommentData.id), isDelete: true});
    } 
    if(props.commentData.postCommentData && props.commentData.accountId === props.commentData.postAccountId){
      menuItem.push({content: props.commentData.postCommentData.fix ? "고정 해제" : "고정", onClick: () => props.onFix(props.commentData.postCommentData.id), isDelete: false});
    }

    setMenuItems(menuItem);
  }, []);
    
    if(props.commentData.postCommentData && props.commentData.postCommentData.isDeleted){
      return (
        <S.PostCommentContainer>
          <S.PostCommentContentBody>
            삭제된 댓글입니다.
          </S.PostCommentContentBody>
        </S.PostCommentContainer>
      )
    }else if(props.commentData.postCommentData) {
      return (
        <S.PostCommentContainer>
          {props.commentData.postCommentData.fix && 
          <S.Fixed>
            <BsFillPinAngleFill size="0.8rem" color="#C5C5C5"/>
            고정됨
          </S.Fixed>
        }
          {menuItems.length > 0 && <Menu item={menuItems}/>}
          <ProfileImage type='small'/>
          <S.PostCommentContent>
            <S.PostCommentContentHeader>
              {props.commentData.postCommentData.nickname}
              <S.PostCommentContentDate>{props.commentData.postCommentData.registrationDate}</S.PostCommentContentDate>
            </S.PostCommentContentHeader>
            <S.PostCommentContentBody>
              {props.commentData.postCommentData.content}
            </S.PostCommentContentBody>
            <S.PostCommentContentFooter>
              {props.commentData.isLiked ? <BiSolidLike size="1rem" onClick={() => props.onLike(props.commentData.postCommentData.id)}/> : <BiLike size="1rem" onClick={() => props.onLike(props.commentData.postCommentData.id)}/>}
              <S.PostCommentContentFooterLike>{props.commentData.postCommentData.likeCount}</S.PostCommentContentFooterLike>
              {props.commentData.postCommentData.parentId === null && <S.PostCommentContentFooterReply onClick={() => props.onChild(props.commentData.postCommentData.id)}>답글</S.PostCommentContentFooterReply>}
            </S.PostCommentContentFooter>
          </S.PostCommentContent>
        </S.PostCommentContainer>
      )
    }
}

const Comments:React.FC<CommentsProps> = (props: CommentsProps) => { 
  const [childOpen, setChildOpen] = useState<boolean>(false);
  const onMoreButtonClick = () => {
    setChildOpen(!childOpen);
  };
  return (
    <>
    {props.commentData.childComment && props.commentData.childComment.length > 0 ? (
      <S.ParentCommentContainer>
        <Comment {...props} />
        {childOpen ? (
          <S.ChildMoreButton onClick={onMoreButtonClick}>
            <AiFillCaretUp size="0.9rem" className="icon"/>
            닫기
          </S.ChildMoreButton>
        ) : (
          <S.ChildMoreButton onClick={onMoreButtonClick}>
          <AiFillCaretDown size="0.9rem" className="icon"/>
          답글 {props.commentData.childComment.length}개 더보기
        </S.ChildMoreButton>
        )}
        
        {childOpen && (
          <S.ChildCommentContainer>
          {props.commentData.childComment.map((children: any, index) => (
            <Comment {...children} key={index} />
            ))}
          </S.ChildCommentContainer>
        )}
      </S.ParentCommentContainer>
    ): (
      <Comment {...props} />
    )
    }
  </>
  )
};

export const MyComments:React.FC<myCommentProps> = (props: myCommentProps) => {
  return(
    <S.MyCommentContainer>
      <S.MyCommentContent>
        <S.MyCommentContentText>{props.myCommentData.content}</S.MyCommentContentText>
        <S.MyCommentDeleteButton onClick={() => props.onDelete(props.myCommentData.id)}>삭제</S.MyCommentDeleteButton>
      </S.MyCommentContent>
      <S.MyCommentPostText>{props.postName} | {props.myCommentData.registrationDate}</S.MyCommentPostText>
    </S.MyCommentContainer>
  )
}

export default Comments;
