import styled from "@emotion/styled";

export const DayPlanContainer = styled.div`
  width: 15%;
  height: auto;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius:0.75rem;
  &:hover {
    border:2px solid #EBB700;
  }
`

export const DayPlanTitle = styled.div`
  width: 100%;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 500;
  color: #000;
  border-radius: 0.75rem;
  border: 2px solid #EBB700;
  background: var(--MainLightColor, #FFECAA);
`

export const PlaceContainer = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  border: 1px solid #EBB700;
  border-radius: 0.75rem;
  margin-top: 1rem;
  align-items: center;
  justify-content: center;
  padding:0;
`

export const PlaceLogo = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFECAA;
`

export const PlaceInfo = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0.5rem;
  position: relative;
`

export const PlaceName = styled.div`
  width: 100%;
  font-size: 1rem;
  font-weight: 500;
  color: #000;
`

export const PlaceAddress = styled.div`
  width: 100%;
  font-size: 0.8rem;
  font-weight: 400;
  color: #5B5B5B;
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
  width: 4rem;
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



