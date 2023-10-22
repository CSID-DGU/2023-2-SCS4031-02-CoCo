import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 5rem;
  background-color: #EBB700;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 4.5rem;
  left: 0;
  z-index: 2;
`

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 98%;
  height: 3.5rem;
  background-color: #ffffff;
`

export const InputValueContainer = styled.div`
  margin: 0 0 0 1rem;
  font-size: 1.2rem;
`

export const HorizontalFirstStartContainer = styled.div`
  display: flex;
  justify-content: first-start;
  align-items: center;
`

// 일정, 장소 검색 대상 결정 컴포넌트
export const DropdownContainer = styled.div`
  width: 10rem;
  height: 3.5rem;
  `

export const DropdownButton = styled.button`
  width: 10rem;
  height: 3.5rem;
  border-right: 1px solid #FFDC61;
  background-color: #ffffff;
  font-size: 1.5rem;
  font-weight: 400;
  color: #000000;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  `

export const OptionContainer = styled.div`
  width: 10rem;
  border: 2px solid #FFDC61;
  background-color: #ffffff;
`

export const OptionButton = styled.div`
  width: auto;
  min-width: 9rem;
  height: 2.5rem;
  font-size: 1.2rem;
  font-weight: 400;
  color: #9e9e9e;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #FFF7DA;
    color: #000000;
  }

`

// 위치 입력 컴포넌트
export const PlaceOptionContainer = styled.div`
  width: 40rem;
  height: 10rem;
  border: 2px solid #FFDC61;
  background-color: #ffffff;
  overflow-y: scroll;
  position: absolute;
  top: 5rem;
  left: 11rem;
`

export const PlaceOptionButton = styled.div`
  width: auto;
  min-width: 9rem;
  height: 2.5rem;
  font-size: 1.2rem;
  font-weight: 400;
  color: #9e9e9e;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #FFF7DA;
    color: #000000;
  }
`
export const PlaceSubOptionContainer = styled.div`
  width: 40rem;
  height: 10rem;
  border: 2px solid #FFDC61;
  background-color: #ffffff;
  overflow-y: scroll;
  position: absolute;
  top: 5rem;
  left: 50rem;
`

export const PlaceSubOptionButton = styled.div`
  width: auto;
  min-width: 9rem;
  height: 2.5rem;
  font-size: 1.2rem;
  font-weight: 400;
  color: #9e9e9e;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #FFF7DA;
    color: #000000;
  }
`