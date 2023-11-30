
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

export const PlaceContainer = styled.div<{ type?: boolean }>`
  margin: 1rem;
  width: 28rem;
  height: 8rem;
  border: 1.5px solid #FFDC61;
  border-radius: 1rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`

export const KeywordContainer = styled.div<{ type?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const KeywordAddress = styled.div`
  width: 5rem;
  max-width: 100%;
  font-size: 0.7rem;
  font-weight: 400;
  color: #5B5B5B;
  white-space: pre-line;
`

export const PlaceAddress = styled.div`
  width: 100%;
  max-width: 100%;
  font-size: 0.8rem;
  font-weight: 400;
  color: #5B5B5B;
  white-space: pre-line;
`

export const PalceText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.15rem;
  width: auto;

  font-size: 1.5rem;
  font-weight: 700;
`

export const ThreeDotsButton = styled.button`
  position: absolute;
  top: 0;
  left: 25.5rem;
  margin: 0.2rem 0 0 0;
  width: auto;
  color: #000000;
  z-index: 100;
  &:hover {
    font-weight: 600;
  }
`

export const ModifyButton = styled.button`
  margin: 0.5rem 0.5rem 0 0;
  width: 2rem;
  font-size: 1rem;
  color: #000000;
  z-index: 100;
  &:hover {
    font-weight: 600;
  }
`

export const PlacePostContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem;
  width: 28rem;
  height: 8rem;
  border: 1.5px solid #FFDC61;
  border-radius: 1rem;
  &:hover{
    background-color: rgba(255, 220, 97, 0.2);
  }
`

export const PlacePostNoneContainer = styled.div`
  display: flex;
  align-items: flex-start;
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
  border-top-left-radius: 0.9rem;
  border-bottom-left-radius: 0.9rem;
  top: -1.2rem;
`

export const PlaceImage = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 100%;
  background-color: #FFECAA;
  border-top-left-radius: 0.9rem;
  border-bottom-left-radius: 0.9rem;
`

export const PlaceInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1.1rem 0 0 0.5rem;
  width: 60%;
  height: 100%;
`

export const PlaceName = styled.div`
  position: relative;
  width: auto;
  max-width: 14rem;
  top: -10rem;
  left: 9rem;
  font-size: 1.2rem;
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
  margin: 0.5rem;
  width: 7rem;
  background-color: #FFFFFF;
  border-radius: 0.5rem;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  color: #9E9E9E;
  font-size: 0.8rem;
  cursor: pointer;

  position: relative;
  top: 0;
  left: -4.9rem;
`

export const ToggleButtonContainer2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.5rem;
  width: 7rem;
  background-color: #FFFFFF;
  border-radius: 0.5rem;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  color: #9E9E9E;
  font-size: 0.8rem;
  cursor: pointer;

  position: absolute;
  top: 1.5rem;
  left: -5rem;
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
    font-weight: 500;
    color: #000000;
  }
`