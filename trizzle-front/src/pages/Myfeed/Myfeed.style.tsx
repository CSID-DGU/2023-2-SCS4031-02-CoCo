import styled from "@emotion/styled";

export const HorizontalContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin: 5rem 0 2rem 0;
`

export const ListTitle = styled.div`
  width: auto;
  height: auto;
  font-size: 1.6rem;
  font-weight: 500;
  color: #000;
`

export const PlusButton = styled.button`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 400;
  color: #b6b6b6;
  &:hover {
    color: #868686;
  }
`

export const PlanListContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between
`

export const PlaceListContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 5rem;
`