import React from "react";
import { TextInputProps } from "./TextInput.type";
import * as S from "./TextInput.style";

const TextInput: React.FC<TextInputProps> = (props: TextInputProps) => {

  return (
    <S.TextInputContainer width={props.styleProps.width}>
      <S.TextInputTitle>{props.title}</S.TextInputTitle>

      <S.TextInput
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        name={props.name}
        id={props.id}
        />
    </S.TextInputContainer>
  )

}

export default TextInput;