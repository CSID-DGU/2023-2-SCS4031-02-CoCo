import styled from "@emotion/styled";

export const DropdownContainer = styled.div`
  width: 10rem;
  height: 1.5rem;
  position: relative;
  `

export const DropdownButton = styled.button`
  width: 10rem;
  height: 2rem;
  border: 1px solid #9e9e9e;
  border-radius: 0.5rem;
  background-color: #ffffff;
  font-size: 0.8rem;
  font-weight: 400;
  color: #9e9e9e;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  `

export const OptionContainer = styled.div`
  width: 10rem;
  border: 1px solid #9e9e9e;
  border-radius: 0.5rem;
  background-color: #ffffff;
`

export const OptionButton = styled.div`
  width: auto;
  min-width: 10rem;
  height: 1.5rem;
  font-size: 0.8rem;
  font-weight: 400;
  color: #9e9e9e;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
    font-weight: 700;
  }

`