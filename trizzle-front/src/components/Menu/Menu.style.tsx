import styled from "@emotion/styled"

export const MenuButtonContainer = styled.div`
  width: 1.8rem;
  height: 1.8rem;
  display: flex;
  position: absolute;
  border-radius: 50%;
  top: 0;
  right: 0.1rem;
  z-index: 10;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #F5F5F5;
  }
`

export const MenuContainer = styled.div`
  width: 6rem;
  height: auto;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  background-color: #ffffff;
  position: absolute;
  z-index:5;
  top: 2rem;
  right: -4rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
`

export const MenuItem = styled.div<{delete:boolean}>`
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 400;
  color: #9E9E9E;
  cursor: pointer;
  &:hover {
    background-color: #F5F5F5;
    color: ${props => props.delete ? "#FF0000" : "#000000"};
    border-radius: 0.5rem;
  }

`