import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Headers.style";
import { NotiProps, Notification } from "./Headers.type";
import ProfileImage from "../ProfileImage";

const Notifications: React.FC<NotiProps> = (props: NotiProps) => {
  
  return (
    <S.NotificationContainer>
      {props.notiList.map((noti: Notification, index:number) => 
        <NotificationItem {...noti} key={index}/>
      )}
    </S.NotificationContainer>
  )

}

const NotificationItem: React.FC<Notification> = (props: Notification) => {
  const [content, setContent] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const type = props.notificationType.split("-");
    if (type[0] === "post") {
      setUrl(`/post/plan/${props.contentId}`);
      if (type[1] === "like") {
        setContent("당신의 게시글에 좋아요를 눌렀습니다.");
      } else if (type[1] === "comment") {
        setContent("당신의 게시글에 댓글을 남겼습니다.");
        if(type[2] && type[2] === "reply") {
          setContent("당신의 댓글에 답글을 남겼습니다.");
        }
      } 
    } else if (type[0] === "review") {
      setUrl(`/post/places/${props.contentId}`);
      if (type[1] === "like") {
        setContent("당신의 리뷰에 좋아요를 눌렀습니다.");
      } else if (type[1] === "comment") {
        setContent("당신의 리뷰에 댓글을 남겼습니다.");
        if(type[2] && type[2] === "reply") {
          setContent("당신의 댓글에 답글을 남겼습니다.");
        }
      } 
    }
  }, []);

  if(content === "") {
    return <></>
  }
  return (
    <S.NotificationItem onClick={() => navigate(url)}>
      <ProfileImage src={props.user.profileImage} type="small" />
      <S.Verticalcontainer>
        <S.NotificationText>
          {props.count >1 ? <span style={{fontWeight:"500"}}>{props.user.nickname}님 외 {props.count-1}이</span> : <span style={{fontWeight:"500"}}>{props.user.nickname}님이</span> }
          &nbsp;{content}
        </S.NotificationText>
        <S.NotificationDate>
          {props.notificationRegistrationDate.split("T")[0]}
        </S.NotificationDate>
      </S.Verticalcontainer>
    </S.NotificationItem>
  )

}

export default Notifications;