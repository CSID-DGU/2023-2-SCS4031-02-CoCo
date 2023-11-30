import styled from "@emotion/styled";


export const Container = styled.div<{type:string}>`
  width: 100%;
  height: 5rem;
  background-color: ${({type}) => type === "main" ? "#ffff" : "#EBB700"};
  display: flex;
  justify-content: center;
  align-items: center;
  position: ${({type}) => type === "main" ? "relative" : "fixed"};
  padding: 0 8rem;
  top:4.5rem;
  left:0;
  z-index: ${({type}) => type === "main" ? "100" : "100"};
  @media screen and (max-width:767px){
    padding: 0 1rem;
    
    
  }
`

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3.5rem;
  border: 2px solid #EBB700;
  background-color: #ffffff;
  border-radius: 0.75rem;
  position: relative;
  z-index: 100;
  .searchIcon {
    width: 1.7rem;
    height: 1.7rem;
    margin-right: 1rem;
    color: #bdbdbd;
    cursor: pointer; 
    &:hover {
      color: #EBB700;
    }
  }
`

export const InputValueContainer = styled.input`
  width: fit-content;
  height: 100%;
  margin: 0 0 0 1rem;
  font-size: 1.2rem;
  border:none;
  &:focus {
    outline: none;
    border: none;
  }
`

export const HorizontalFirstStartContainer = styled.div`
  display: flex;
  justify-content: first-start;
  align-items: center;
`

// 일정, 장소 검색 대상 결정 컴포넌트
export const DropdownContainer = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  `

export const DropdownButton = styled.button`
  width: 100%;
  height:1.4rem;
  border-right: 1px solid #FFDC61;
  background-color: #ffffff;
  font-size: 1.1rem;
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
  border: 2px solid #EBB700;
  background-color: #ffffff;
  position: absolute;
  top: 5rem;
  left: 9rem;
`

export const OptionButton = styled.div`
  width: auto;
  height: 2.5rem;
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
export const PlaceOptionContainer = styled.div<{type?:string}>`
  width: 40rem;
  height: 10rem;
  border: 2px solid #EBB700;
  background-color: #ffffff;
  overflow-y: scroll;
  position: absolute;
  top: 4rem;
  left: 0;
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
  left: 8rem;
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