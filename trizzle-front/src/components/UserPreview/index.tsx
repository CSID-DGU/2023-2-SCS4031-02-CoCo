import React, { useState } from "react";
import * as S from './UserPreview.styles';
import { AiOutlineRight } from "react-icons/ai";

interface UserPreviewProps {
  nickName: string;
  keyword: string[];
}

export default function UserPreview({ nickName, keyword }: UserPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <S.Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      >
      <S.HorizontalFirstStartContainer>
        <S.UserImage />
        <S.VerticalFirstStartContainer>
          <S.UserIdText>
            {nickName}
          </S.UserIdText>
          <S.HorizontalFirstStartContainer>
            {keyword.map((value, index) => (
              <S.UserKeywordTag key={(index)}>
                <S.UserKeywordTagFont>
                  {value}
                </S.UserKeywordTagFont>
              </S.UserKeywordTag>
            ))}
          </S.HorizontalFirstStartContainer>
        </S.VerticalFirstStartContainer>
      </S.HorizontalFirstStartContainer>
      <AiOutlineRight
        style={{
          width: "5rem",
          height: "2.5rem",
          color: isHovered ? "#EBB700" : "#BDBDBD",
          opacity: 0.5
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </S.Container>
  );
}