import React from "react";
import * as S from "./SearchInput.style";
import { SearchInputProps } from "./SearchInput.type";

const SearchInput:React.FC<SearchInputProps> = (props: SearchInputProps) => {
  return (
    <S.MapSearchWrapper>
      <S.MapSearchInput
        placeholder="장소를 입력해주세요"
        onChange={props.onChange}
        value={props.value}
        onKeyDown={props.onKeyPress}
      />
    </S.MapSearchWrapper>
  )
};

export default SearchInput;