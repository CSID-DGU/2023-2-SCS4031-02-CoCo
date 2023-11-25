import React, { useState } from "react";
import * as S from './SearchBar.style'
import { SearchBarProps } from "./SearchBar.type";
import { BsMap } from 'react-icons/bs';
import { IoIosSearch } from "react-icons/io";
import { koreaRegions } from '../../utils/Data/mapData';
import { useNavigate } from "react-router-dom";

const SearchBar:React.FC<SearchBarProps> = (props: SearchBarProps) => {
  const [searchField, setSearchField] = useState<string>(props.region? props.region: "전체");
  const [searchValue, setSearchValue] = useState<string>(props.value? props.value: '');
  const [isFieldOpen, setIsFieldOpen] = useState<boolean>(false);
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const onSearch = () => {
    if(searchValue !== '') { 
      navigate(`/search/${searchField}/plans?keyword=${searchValue}`);
    }
  }

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <S.Container type={props.type? props.type: "normal"}>
      <S.InputContainer>
        <S.HorizontalFirstStartContainer>
          <S.DropdownContainer>
            <S.DropdownButton type="button" onClick={() => setIsFieldOpen(!isFieldOpen)}>
              {searchField}
              <BsMap
          style={{
            width: "3rem",
            height: "1.5rem",
            color: isHovered || isMapOpen ? "#FFDC61" : "#D9D9D9",
            opacity: 0.8
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsMapOpen(!isMapOpen)}
        />
            </S.DropdownButton>
            {isFieldOpen &&
              <S.PlaceOptionContainer type={props.type? props.type: "normal"}>
              {koreaRegions.map((place, index) => (
                <S.PlaceOptionButton key={index} onClick={() =>{ setSearchField(place.name); setIsFieldOpen(!isFieldOpen)}} >
                  {place.name}
                </S.PlaceOptionButton>
              ))}
            </S.PlaceOptionContainer>
            }
          </S.DropdownContainer>

          <S.InputValueContainer
            placeholder="검색어를 입력해주세요"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={onKeyPress}
          />
        </S.HorizontalFirstStartContainer>
        <IoIosSearch className="searchIcon" onClick={onSearch}/>
      </S.InputContainer>
    </S.Container>
  )
}

export default SearchBar;