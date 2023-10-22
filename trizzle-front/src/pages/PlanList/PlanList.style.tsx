import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction:column;
  gap: 1rem;
  margin-bottom: 10rem;
`

export const HeadContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const DDay = styled.div`
  width: auto;
  height: auto;
  font-size: 1rem;
  font-weight: 400;
  color: #9e9e9e;
`

export const PlusButton = styled.button`
  width: 9rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  background-color: #ffffff;
  border: 1px solid #fcc400;
  color: #fcc400;
  font-size: 1rem;
  font-weight: 300;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  &:hover {
    border:2px solid #e3b200;
    color: #e3b200;
    font-weight: 400;
  }
`

export const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #dadada;
`

export const PlanList = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  /* white-space: pre-wrap; */
  flex-wrap: wrap;
  min-height: 7rem;
justify-content: space-between;
`

export const PastTitle = styled.div`
  width: 100%;
  height: auto;
  margin-top: 1rem;
  font-size: 1.5rem;
  font-weight: 500;
`