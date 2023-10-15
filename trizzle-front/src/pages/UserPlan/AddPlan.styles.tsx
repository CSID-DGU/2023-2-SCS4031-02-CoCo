import styled from "@emotion/styled";

export const PageTitleContainer = styled.div`
  width: 100%;
  height: 9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFF7DA;
  position:absolute;
  top: 4.5rem;
  left: 0;
`;

export const PageTitle = styled.div`
  font-size: 2rem;
  font-weight: 600;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 11rem;
  margin-bottom: 1.5rem;
  gap: 1rem;
`

export const HorizontalLine = styled.div`
  width: 100%;
  height: 0.1rem;
  background-color: #e4e4e4;
  margin: 1.5rem 0;
`

export const Button = styled.button`
  width: 7rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  background-color: #ffffff;
  border: 1px solid #BEBEBE;
  font-size: 1rem;
  font-weight: 400;
  color: #BEBEBE;
  cursor: pointer;
  &:hover {
    border:2px solid #747474;
    color: #747474;
  }
`

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
  border: ${({isClicked}) => isClicked ? "2px solid #FFDC61" : "1px solid #BDBDBD"};
  color: ${({isClicked}) => isClicked ? "#000" : "#BDBDBD"};
  font-size: 1rem;
  font-weight: ${({isClicked}) => isClicked ? "500" : "400"};
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: none;
`

export const FormContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const HorizontalContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  gap: 1rem;
  align-items: center;
`

export const SelectTitle = styled.div`
  width: auto;
  font-size: 1.2rem;
  font-weight: 500;
  margin-right: 1rem;
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
`
