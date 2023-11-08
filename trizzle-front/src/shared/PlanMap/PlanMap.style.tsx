
import styled from "@emotion/styled";

export const MapContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem 0 4rem 0;
  position: relative;
`

export const DaysContainer = styled.div`
  width: 90%;
  height: 2rem;
  display: flex;
`

export const Day = styled.div<{isClicked:boolean}>`
  width: 5.5rem;
  height: 100%;
  border-top-right-radius: 0.5rem;
  border-top-left-radius: 0.5rem;
  background-color: ${({isClicked}) => isClicked ? "#FFF7DA" : "#ffffff"};
  border: ${({isClicked}) => isClicked ? "2px solid #FCC400" : "1px solid #BDBDBD"};
  color: ${({isClicked}) => isClicked ? "#000" : "#BDBDBD"};
  font-size: 1rem;
  font-weight: ${({isClicked}) => isClicked ? "500" : "400"};
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: none;
  cursor: pointer;
`

export const OverlayButtonContainer = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 4rem;
  right: 6rem;
  z-index: 5;
`

export const OverlayButton = styled.button`
  width: 8rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  background-color: #ffffff;
  border: 2px solid #FCC400;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  align-items: center;
  &:hover {
    background-color: #FFF7DA;
  }
`
