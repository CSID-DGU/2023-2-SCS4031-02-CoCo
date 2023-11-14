import React, {useEffect, useState} from 'react';
import * as S from './Comments.style';
import { CommentsProps, myCommentProps } from './Comments.type';
import {BsFillPinAngleFill} from 'react-icons/bs';
import ProfileImage from '../ProfileImage';
import {BiLike, BiSolidLike} from 'react-icons/bi';
import {AiFillCaretDown, AiFillCaretUp} from 'react-icons/ai';
import Menu from '../Menu';
import CommentInput from '../CommentInput';
import { useAsync } from '../../utils/API/useAsync';


const Comment:React.FC<CommentsProps> = (props: CommentsProps) => { 
  const [menuItems, setMenuItems] = useState<any[]>([]);
  useEffect(() => {
    let menuItem:any[] = []; 
    if(props.commentData.accountId !== ""){
    if(props.commentData.isMe && props.commentData.commentData) {
      menuItem.push({content: "삭제", onClick: () => props.onDelete(props.commentData.commentData.id), isDelete: true});
    } 
    if(props.commentData.commentData && props.commentData.accountId === props.commentData.postAccountId){
      menuItem.push({content: props.commentData.commentData.fix ? "고정 해제" : "고정", onClick: () => props.onFix(props.commentData.commentData.id), isDelete: false});
    }

    setMenuItems(menuItem);
  }
  }, []);
    
    if(props.commentData.commentData && props.commentData.commentData.isDeleted){
      return (
        <S.PostCommentContainer>
          <S.PostCommentContentBody>
            삭제된 댓글입니다.
          </S.PostCommentContentBody>
        </S.PostCommentContainer>
      )
    }else if(props.commentData.commentData) {
      return (
        <S.PostCommentContainer>
          {props.commentData.commentData.fix && 
          <S.Fixed>
            <BsFillPinAngleFill size="0.8rem" color="#C5C5C5"/>
            고정됨
          </S.Fixed>
        }
          {menuItems.length > 0 && <Menu item={menuItems}/>}
          <ProfileImage type='small'/>
          <S.PostCommentContent>
            <S.PostCommentContentHeader>
              {props.commentData.nickname}
              <S.PostCommentContentDate>{props.commentData.commentData.registrationDate}</S.PostCommentContentDate>
            </S.PostCommentContentHeader>
            <S.PostCommentContentBody>
              {props.commentData.commentData.commentContent}
            </S.PostCommentContentBody>
            <S.PostCommentContentFooter>
              {props.commentData.isLiked ? <BiSolidLike size="1rem" onClick={() => props.onLike(props.commentData.commentData.id)}/> : <BiLike size="1rem" onClick={() => props.onLike(props.commentData.commentData.id)}/>}
              <S.PostCommentContentFooterLike>{props.commentData.commentData.likeCount}</S.PostCommentContentFooterLike>
              {props.commentData.commentData.parentId === null && <S.PostCommentContentFooterReply onClick={() => props.onChild()}>답글</S.PostCommentContentFooterReply>}
            </S.PostCommentContentFooter>
          </S.PostCommentContent>
        </S.PostCommentContainer>
      )
    }
}

const Comments:React.FC<CommentsProps> = (props: CommentsProps) => { 
  const [childOpen, setChildOpen] = useState<boolean>(false);
  const [childCommentOpen, setChildCommentOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);
  const [state, fetchData] = useAsync({url: ""});

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if(value !== "") setDisabled(false);
    else setDisabled(true);
  }, [value]);

  const onMoreButtonClick = () => {
    setChildOpen(!childOpen);
  };
  return (
    <>
    {props.commentData.childComment && props.commentData.childComment.length > 0 ? (
      <S.ParentCommentContainer>
        <Comment {...props} onChild={() => setChildCommentOpen(!childCommentOpen)}/>
        {childCommentOpen && 
          <CommentInput onChange={() => onChange} value={value} 
          onSubmit={() => {props.onChildSubmit(props.commentData.commentData.id, value, props.commentData.commentData.postId, props.commentData.commentData.reviewId); setValue("")}} disabled={disabled} placeholder='답글 달기..'/>
        }
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
      <>
      {!props.commentData.commentData.isDeleted && <Comment {...props} /> }
      </>
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
