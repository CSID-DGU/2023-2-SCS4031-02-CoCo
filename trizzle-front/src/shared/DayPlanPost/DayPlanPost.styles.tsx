
import styled from "@emotion/styled";

export const DayContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  width: 28rem;
  height: 2rem;
  border: 2px solid #EBB700;
  background: #FFECAA;

  padding: 1rem;
  font-size: 1.2rem;
  font-weight: 500;
  border-radius: 0.5rem;
`

export const PlaceContainer = styled.div`
  margin: 1rem;
  width: 28rem;
  height: 8rem;
  border: 1.5px solid #FFDC61;
  border-radius: 1rem;
`

export const PalceText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0 2rem 0;
  width: auto;
  height: 3.2rem;

  font-size: 1.5rem;
  font-weight: 700;
`

export const ThreeDotsButton = styled.button`
  position: relative;
  margin: 0.2rem 0 0 0;
  top: 0.25rem;
  left: 25.5rem;
  width: auto;
  color: #BEBEBE;
  &:hover {
    font-weight: 600;
  }
`

export const PlacePostContainer = styled.div`
  display: block;
  margin: 1rem;
  width: 28rem;
  height: 8rem;
  border: 1.5px solid #FFDC61;
  border-radius: 1rem;
`

export const PlaceLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 100%;
  background-color: #FFECAA;
  border-top-left-radius: 0.75rem;
  border-bottom-left-radius: 0.75rem;
  position: relative;
  top: -1.2rem;
`

export const PlaceInfo = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 0.5rem;
`

export const PlaceName = styled.div`
  position: relative;
  top: -10rem;
  left: 9rem;
  font-size: 1.5rem;
  font-weight: 700;
`

export const PlacePostName = styled.div`
  position: relative;
  top: -8rem;
  left: 9rem;
  color: #747474;
  font-size: 1rem;
  font-weight: 7400;
`

export const ToggleButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #FFFFFF;
  border-radius: 0.5rem;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  color: #9E9E9E;
  font-size: 0.8rem;
  cursor: pointer;

  position: absolute;
  top: 1rem;
  left: -4rem;
`

export const ToggleButtonOption = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  width: 7rem;
  height: 2rem;
  border-radius: 0.5rem;

  color: #9E9E9E;
  font-size: 0.8rem;
  cursor: pointer;
  &:hover{
    background-color: #E9E9E9;
  }
`