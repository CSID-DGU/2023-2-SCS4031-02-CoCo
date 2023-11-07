import styled from "@emotion/styled";

export const DayPlanContainer = styled.div`
  width: 12rem;
  min-width: 12rem;
  height: auto;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius:0.75rem;
  /* &:hover {
    border:1px solid #EBB700;
  } */
  position: relative;
`

export const DayPlanTitle = styled.div`
  width: 100%;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: 1rem;
  font-weight: 500;
  color: #000;
  border-radius: 0.75rem;
  border: 2px solid #EBB700;
  background: var(--MainLightColor, #FFECAA);

  .menu {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    cursor: pointer;
    color: #EBB700;
    &:hover {
      color: #ad8800;
    }
  }
`

export const PlaceContainer = styled.div`
  width: 100%;
  height: 6rem;
  display: flex;
  border: 1.5px solid #EBB700;
  background-color:white;
  border-radius: 0.75rem;
  margin-top: 1rem;
  align-items: center;
  justify-content: center;
  padding:0;
  position: relative;
`

export const PlaceLogo = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFECAA;
  border-top-left-radius: 0.75rem;
  border-bottom-left-radius: 0.75rem;
`

export const PlaceInfo = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 0.5rem;
  position: relative;
`

export const PlaceName = styled.div`
  width: 100%;
  max-width: 100%;
  white-space: pre-line;
  /* overflow: hidden;
  text-overflow: ellipsis; */
  font-size: 1rem;
  font-weight: 500;
  color: #000;
  &:hover {
    overflow: visible;
  }
`

export const PlaceAddress = styled.div`
  width: 100%;
  max-width: 100%;
  font-size: 0.8rem;
  font-weight: 400;
  color: #5B5B5B;
  white-space: pre-line;
`

export const PlusButtonContainer = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  flex-direction: column;
  border: 1px dashed #EBB700;
  border-radius: 0.75rem;
  margin-top: 1rem;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`

export const AddButton = styled.button`
  width: 5rem;
  height: 1.7rem;
  border-radius: 0.75rem;
  border: 1px solid #9E9E9E;
  color: #9E9E9E;
  font-size: 0.8rem;
  font-weight: 400;
  background-color: #ffffff;
  cursor: pointer;
  &:hover {
    border:1px solid #707070;
    color: #707070;
  }
`

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


export const HorizontalContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  gap: 1rem;
  align-items: center;
  position: relative;
`



