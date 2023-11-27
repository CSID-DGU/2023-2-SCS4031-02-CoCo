import styled from "@emotion/styled";

export const HorizontalContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2.75rem;
  flex-wrap: wrap;
`

export const VerticalContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const PageButtonContainer = styled.div`
  width: 60%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 5rem auto;
  gap: 1rem;
`

export const NumberButton = styled.button<{isCurrent:boolean}>`
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 400;
  border-radius: 50%;
  border: none;
  color: ${props => props.isCurrent ? "#000" : "#D9D9D9"};
  background-color: transparent;
  cursor: pointer;
  &:hover {
    color: black;
  }
`

export const DotButton = styled.button<{isCurrent:boolean}>`
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  border: none;
  background-color: ${props => props.isCurrent ? "#000" : "#D9D9D9"};
  cursor: pointer;
  &:hover {
    background-color: black;
  }
`

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1.5rem;
  justify-items: flex-start;
  align-items: flex-start;
  margin: 1.5rem 0 2rem 0;
  height: 15rem;
`


export const ListContainer = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 20rem;
  height: 5rem;
  border: 1px solid #FFF4CC;
  border-radius: 1rem;
  box-shadow: 1px 1px 1px 1px #9E9E9E;
  &:hover{
    border: 2px solid #FFDC61;
  }
`

export const RegionPlaceText = styled.button`
  padding: 0 0.5rem;
  width: 7rem;
  height: 100%;
  font-size: 1.2rem;
  font-weight: 700;
  background-color: #FFF4CC;
  border-top-left-radius: 0.95rem;
  border-bottom-left-radius: 0.95rem;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const TitleText = styled.button`
  margin: 0 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 500;
`

export const DateText = styled.button`
  margin: 0 0 0 0.5rem;
  font-size: 0.8rem;
  font-weight: 300;
  color: #747474;
`

export const VerticalCenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.7rem;
  
`