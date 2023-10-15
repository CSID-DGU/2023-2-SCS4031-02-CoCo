import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const InputWrapper = styled.div`
  width: 100%;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  align-items: center;
  margin: 2rem 0;
`

export const SearchButton = styled.button`
  width: 5rem;
  height: 100%;
  background-color: #FFECAA;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  font-weight: 400;
`


export const MapWrapper = styled.div`
  width: 95%;
  height: 65%;
  max-height: 65%;
  display: flex;
  padding:0;
  gap: 0;
  margin-bottom: 1rem;
  overflow-wrap: break-word;
`

export const MapListContainer = styled.ul`
  width: 25%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  border: 2px solid #FFDC61;
  border-left: none;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  list-style: none;
`

export const ListItemContainer = styled.li`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: transparent;
  padding: 1rem;
  gap: 0.5rem;
  border-bottom: 1px solid #CFCFCF;
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #CFCFCF;
    margin-left: 1rem; /* 간격 설정 */
  }
  &:last-child::after {
    content: none; /* 마지막 요소 뒤에 가로선 제거 */
  }
  &:first-child:hover {
    background-color: transparent;
  }
  &:last-child {
    border-bottom-right-radius: 1rem;
  }
  &:hover {
    background-color: #F5F5F5;
  }
`

export const ListItemTitle = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: #3F3F3F;
`

export const PlaceNameConatiner = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
  align-items: flex-end;
`

export const PlaceName = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #535353;
  width: auto;
  max-width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const PlaceCategory = styled.div`
  font-size: 0.75rem;
  font-weight: 300;
  color: #D1D1D1;
  width: auto;
  max-width: 30%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const PlaceRoadAddress = styled.div`
  font-size: 1rem;
  font-weight: 300;
  max-width: 80%;
  white-space: normal;
`

export const PlaceTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
`

export const PlaceAdress = styled.div`
  font-size: 0.75rem;
  font-weight: 300;
  color: #949494;
  width: auto;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
`

export const PlacePhone = styled.div`
  font-size: 1rem;
  font-weight: 300;
  max-width: 80%;
  color: #5671FF;
`

export const ButtonsWrapper = styled.div`
  width: 100%;
  height:auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Buttons = styled.button`
  width: 45%;
  height: 2rem;
  border: 1px solid #FFDC61;
  border-radius: 0.6rem;
  background-color: transparent;
  font-size: 1rem;
  font-weight: 400;
  color: #6A6A6A;
  &:hover {
    color: black;
    font-weight: 600;
  }
`

export const LinkText = css`
  color: #6A6A6A;
  font-size: 1rem;
  font-weight: 400;
  &:hover {
    color: black;
    font-weight: 600;
  }
`