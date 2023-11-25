import React, {useEffect, useRef} from "react";
import { CommentInputProps } from "./CommentInput.type";
import * as S from "./CommentInput.style";
import ProfileImage from "../ProfileImage";

const CommentInput: React.FC<CommentInputProps> = (props: CommentInputProps) => {
    const textarea = useRef<HTMLTextAreaElement>(null);
    const src = sessionStorage.getItem("profileImg") !== null && sessionStorage.getItem("profileImg") !== "" ? sessionStorage.getItem("profileImg") : "";

    useEffect(() => {
      textarea.current!.style.height = "auto";
      textarea.current!.style.height = textarea.current!.scrollHeight + "px";
    }, [props.value]);

    return (
      <S.Container>
        <ProfileImage type="small" src={src}/>
        <S.ContentContainer>
          <S.TextArea
            ref={textarea}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            rows={2}
            />
          <S.SaveButton onClick={props.onSubmit} disabled={props.disabled}>작성</S.SaveButton>
        </S.ContentContainer>
      </S.Container>
    )
};

export default CommentInput;