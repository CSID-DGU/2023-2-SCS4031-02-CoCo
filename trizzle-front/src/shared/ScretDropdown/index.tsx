import React, { useState } from "react";
import * as S from "./ScretDropdown.styles";
import { AiOutlineDown } from "react-icons/ai";

type ScretDropdownPorps = {
  titleValue: boolean;
  onScret: (value: boolean) => void;
  disapled?: boolean;
}

const ScretDropdown: React.FC<ScretDropdownPorps> = (props: ScretDropdownPorps) => {
  const [title, setTitle] = useState<string>(props.titleValue ? '나만 보기' : '게시하기');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClick = (value: string) => {
    setIsOpen(!isOpen)
    if (value === "나만 보기") {
      setTitle(value);
      props.onScret(true);
    } else {
      props.onScret(false);
      setTitle(value);
    }
  }

  return (
    <>
      <S.DropdownContainer >
        <S.DropdownButton type="button" onClick={() => setIsOpen(!isOpen)} disabled={props.disapled ? props.disapled : false}>
          {title}
          <AiOutlineDown size="1.1rem" />
        </S.DropdownButton>
        {isOpen &&
          <S.OptionContainer>
            <S.OptionButton onClick={() => onClick("나만 보기")} >
              나만 보기
            </S.OptionButton>
            <S.OptionButton onClick={() => onClick("게시하기")} >
              게시하기
            </S.OptionButton>
          </S.OptionContainer>}
      </S.DropdownContainer >
    </>
  );
}
export default ScretDropdown;