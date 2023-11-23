import styled from "@emotion/styled";

export const TabContainer = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: #ffffff;
  margin-bottom: 1rem;
`

export const Tab = styled.div<{active: boolean}>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  color: ${({active}) => active ? "#000000" : "#BDBDBD"};
  border-bottom: ${({active}) => active ? "2px solid #000" : "2px solid #dadada"};
`

export const RoundTabContainer = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0 3rem 0;
`

export const RoundTab = styled.div<{active: boolean}>`
  width: auto;
  height: auto;
  padding: 0.5rem 1rem;
  display: flex;
  border-radius: 1rem;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: ${({active}) => active ? "600" : "400"};
  color: ${({active}) => !active ? "#bdbdbd" : "#EBB700"};
  border: ${({active}) => !active ? "1px solid #bdbdbd" : "2px solid #EBB700"};
  cursor: pointer;
  .icon {
    color: ${({active}) => !active ? "#bdbdbd" : "#EBB700"};
    margin-right: 0.5rem;
  }
`