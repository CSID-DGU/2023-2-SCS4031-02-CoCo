import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import * as S from './Comments.style';
import { CommentsProps, myCommentProps } from './Comments.type';
import {BsFillPinAngleFill} from 'react-icons/bs';
import ProfileImage from '../ProfileImage';
import IconButton from '../IconButton';
import {AiFillCaretDown, AiFillCaretUp} from 'react-icons/ai';
import Menu from '../Menu';
import CommentInput from '../CommentInput';


const Comment:React.FC<CommentsProps> = (props: CommentsProps) => { 
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [value, setValue] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);
  const [childCommentOpen, setChildCommentOpen] = useState<boolean>(false);
  const registration = new Date(props.commentData.commentData.commentRegistrationDate);
  const [likeCount, setLikeCount] = useState<number>(props.commentData.commentData.likeCount);
  const now = new Date();
  const diff = Math.floor((now.getTime() - registration.getTime()) / 1000 / 60);

  let diffDate = "";
  if(diff < 60) {
    diffDate = `${diff}분`;
  } else if(diff < 60 * 24) {
    diffDate = `${Math.floor(diff / 60)}시간`
  } else if(diff < 60 * 24 * 30) {
    diffDate = `${Math.floor(diff / 60 / 24)}일`;
  } else if(diff < 60 * 24 * 30 * 12) {
    diffDate = `${Math.floor(diff / 60 / 24 / 30)}달`;
  } else {
    diffDate = `${Math.floor(diff / 60 / 24 / 30 / 12)}년`;
  }

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  }

  const onChild = () => {
    setChildCommentOpen(!childCommentOpen);
  }

  useEffect(() => {
    if(value !== "") setDisabled(false);
    else setDisabled(true);
  }, [value]);
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

  const onChildSubmit = () => {
    if(props.onChildSubmit) {
      props.onChildSubmit(props.commentData.commentData.id, value, props.commentData.commentData.postId, props.commentData.commentData.reviewId);
      setValue("");
    } else {
      return;
    }
  }
    if(props.commentData.commentData && props.commentData.commentData.deleted && props.commentData.commentData.parentId === null){
      return (
        <S.PostCommentContainer>
          <S.PostCommentContentBody>
            삭제된 댓글입니다.
          </S.PostCommentContentBody>
        </S.PostCommentContainer>
      )
    }else if(props.commentData.commentData) {
      return (
        <>
        <S.PostCommentContainer>
          {props.commentData.commentData.fix && 
          <S.Fixed>
            <BsFillPinAngleFill size="0.8rem" color="#C5C5C5"/>
            고정됨
          </S.Fixed>
        }
          {menuItems.length > 0 && <Menu item={menuItems}/>}
          <ProfileImage type='small' src={props.commentData.profileImg}/>
          <S.PostCommentContent>
            <S.PostCommentContentHeader>
              {props.commentData.nickname}
              <S.PostCommentContentDate>{diffDate} 전</S.PostCommentContentDate>
            </S.PostCommentContentHeader>
            <S.PostCommentContentBody>
              {props.commentData.commentData.commentContent}
            </S.PostCommentContentBody>
            <S.PostCommentContentFooter>
              <IconButton icon="like" type="comment" contentId={props.commentData.commentData.id} filled={props.commentData.isLike ? props.commentData.isLike : false} count={likeCount} setCount={setLikeCount}/>
              <S.PostCommentContentFooterLike>{likeCount}</S.PostCommentContentFooterLike>
              {props.commentData.commentData.parentId === null ? (
                <S.PostCommentContentFooterReply onClick={() => onChild()}>답글</S.PostCommentContentFooterReply>       
              ): (
                <></>
              )
                }
            </S.PostCommentContentFooter>
          </S.PostCommentContent>
        </S.PostCommentContainer>
          {childCommentOpen &&
          <S.ChildCommentContainer>
                  <CommentInput
                  placeholder="댓글 입력..."
                  value={value}
                  onChange={onChange}
                  onSubmit={onChildSubmit}
                  disabled={disabled}
                  />
            </S.ChildCommentContainer>
                }
        </>
      )
    }
}

const Comments:React.FC<CommentsProps> = (props: CommentsProps) => { 
  const [childOpen, setChildOpen] = useState<boolean>(false);
  const [childComments, setChildComments] = useState<any>([]);

  const onMoreButtonClick = () => {
    setChildOpen(!childOpen);
  };

  useEffect(() => {
    const updateLists = props.commentData.childComment?.filter((childComment:any) => {
      return !childComment.commentData.deleted
    });
    setChildComments(updateLists);
  }, [props])
  return (
    <>
    {childComments > 0 ? (
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
          답글 {childComments.length}개 더보기
        </S.ChildMoreButton>
        )}
        
        {childOpen && (
          <S.ChildCommentContainer>
            {childComments.map((childComment:any,index:number) => (
              <Comment
                commentData={childComment}
                onDelete={props.onDelete}
                onFix={props.onFix}
                key={index}
                />
            ))}
          </S.ChildCommentContainer>
        )}
      </S.ParentCommentContainer>
    ): (
      <>
      {!props.commentData.commentData.deleted && <Comment {...props} /> }
      </>
    )
    }
  </>
  )
};

export const MyComments:React.FC<myCommentProps> = (props: myCommentProps) => {
  if(!props.myCommentData.deleted) {
  return(
    <S.MyCommentContainer>
      <S.MyCommentContent>
        <S.MyCommentContentText>{props.myCommentData.commentContent}</S.MyCommentContentText>
        <S.MyCommentDeleteButton onClick={() => props.onDelete(props.myCommentData.id)}>삭제</S.MyCommentDeleteButton>
      </S.MyCommentContent>
      <S.MyCommentPostText>
        <Link 
      to={props.myCommentData.postId? `/post/plan/${props.myCommentData.postId}` : `/post/places/${props.myCommentData.reviewId}`}
      style={{color:"#B8B8B8"}}
      >원글이동</Link> | {props.myCommentData.commentRegistrationDate.slice(0,16)}</S.MyCommentPostText>
    </S.MyCommentContainer>
  )
  }
}

export default Comments;
