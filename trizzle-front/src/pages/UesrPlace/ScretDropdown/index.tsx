import React, { useState } from "react";
import * as S from "./ScretDropdown.styles";
import { AiOutlineDown} from "react-icons/ai";

interface ScretDropdownPorps {
  title_value?: string;
  onScret: (value: boolean) => void;
}

export default function ScretDropdown({ title_value, onScret }: ScretDropdownPorps) {
  const [title, setTitle] = useState<string>(title_value === '공개 범위' ? title_value : '공개 범위');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClick = (value: string) => {
    setIsOpen(!isOpen)
    if (value === "나만 보기") {
      setTitle(value);
      onScret(false);
    } else {
      onScret(true);
      setTitle(value);
    }
  }

  return (
    <>
      <S.DropdownContainer>
        <S.DropdownButton type="button" onClick={() => setIsOpen(!isOpen)}>
          {title}
          <AiOutlineDown size="1.1rem" />
        </S.DropdownButton>
        {isOpen &&
          <S.OptionContainer>
            <S.OptionButton type="button" onClick={() => onClick("나만 보기")} >
              나만 보기
            </S.OptionButton>
            <S.OptionButton type="button" onClick={() => onClick("게시하기")} >
              게시하기
            </S.OptionButton>
          </S.OptionContainer>}
      </S.DropdownContainer >
    </>
  );
}