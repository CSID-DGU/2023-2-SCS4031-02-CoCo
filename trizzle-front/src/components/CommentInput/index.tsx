import React from "react";
import { CommentInputProps } from "./CommentInput.type";
import * as S from "./CommentInput.style";
import ProfileImage from "../ProfileImage";

const CommentInput: React.FC<CommentInputProps> = (props: CommentInputProps) => {
  
    return (
      <S.Container>
        <ProfileImage type="small"/>
        <S.ContentContainer>
          <S.TextArea
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            />
          <S.SaveButton onClick={props.onSubmit} disabled={props.disabled}>작성</S.SaveButton>
        </S.ContentContainer>
      </S.Container>
    )
};

export default CommentInput;