import React, { useEffect, useState } from "react";
import * as S from './SearchBar.style'
import { BsMap } from 'react-icons/bs';
import { BiSolidDownArrow } from 'react-icons/bi';
import { koreaRegions } from '../../utils/Data/mapData';

export default function SearchBar(type?:any) {
  const [searchField, setSearchField] = useState<string>('일정');
  const [searchValue, setSearchValue] = useState<string>('');
  const [isFieldOpen, setIsFieldOpen] = useState<boolean>(false);
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState(false);

  const onClick = (value: string) => {
    setIsFieldOpen(!isFieldOpen);
    setSearchField(value);
    setSearchValue(searchValue);
  }

  // const handleKeyPress = (e) => {
  //   if (e.key === 'Enter') {
  //     onFieldDate(searchField);
  //     onValueData(searchValue);
  //   }
  // };

  const isMapClose = (region: string) => {
    setIsMapOpen(!isMapOpen);
    setSearchValue((prev) => prev + ` ${region}`);
  }

  return (
    <S.Container type={type? type: "normal"}>
      <S.InputContainer>
        <S.HorizontalFirstStartContainer>
          <S.DropdownContainer>
            <S.DropdownButton type="button" onClick={() => setIsFieldOpen(!isFieldOpen)}>
              {searchField}
              <BiSolidDownArrow size="1rem" />
            </S.DropdownButton>
            {isFieldOpen &&
              <S.OptionContainer>
                <S.OptionButton onClick={() => onClick("일정")} >
                  일정
                </S.OptionButton>
                <S.OptionButton onClick={() => onClick("장소")} >
                  장소
                </S.OptionButton>
              </S.OptionContainer>
            }
          </S.DropdownContainer>

          <S.InputValueContainer>
            {searchValue}
          </S.InputValueContainer>
        </S.HorizontalFirstStartContainer>

        <BsMap
          style={{
            width: "4rem",
            height: "2rem",
            color: isHovered || isMapOpen ? "#FFDC61" : "#D9D9D9",
            opacity: 0.8
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsMapOpen(!isMapOpen)}
        />
        {isMapOpen && (
          <S.PlaceOptionContainer>
            {koreaRegions.map((place, index) => (
              <S.PlaceOptionButton key={index} onClick={() => setSearchValue(place.name)} >
                {place.name}
              </S.PlaceOptionButton>
            ))}
          </S.PlaceOptionContainer>
        )}
        {/* {isMapOpen && searchValue != '' && (
          <S.PlaceSubOptionContainer>
            {koreaRegions.map((place, index) => (
              <S.PlaceSubOptionButton key={index} onClick={() => isMapClose(place.name)} >
                {place.name}
              </S.PlaceSubOptionButton>
            ))}
          </S.PlaceSubOptionContainer>
        )} */}
      </S.InputContainer>
    </S.Container>
  )
}