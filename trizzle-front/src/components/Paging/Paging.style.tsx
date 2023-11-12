import styled from "@emotion/styled";

export const HorizontalContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const VerticalContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const PageButtonContainer = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 5rem;
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