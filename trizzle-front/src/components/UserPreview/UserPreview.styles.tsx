import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  height: auto;
  border: 2px solid #9E9E9E;
  border-radius: 0.5rem;
  &:hover {
    border: 2px solid #EBB700;
  }
`
export const HorizontalFirstStartContainer = styled.div`
  display: flex;
  justify-content: first-start;
  align-items: center;
  gap: 1rem;
`
export const VerticalFirstStartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: first-start;
  gap: 0.8rem;
`

export const UserImage = styled.div`
  margin: 0.5rem 0.5rem 0.5rem 1rem;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background-color: #D9D9D9;
`

export const UserIdText = styled.div`
  margin: 1rem 0 0 0;
  font-size: 1.2rem;
  font-weight: bold;
`

export const UserKeywordTag = styled.div`
  margin: 0 0 1rem 0;
  padding: 0.2rem 1rem 0.2rem 1rem;
  width: auto;
  height: auto;
  border-radius: 0.5rem;
  background-color: #D9D9D9;
`
export const UserKeywordTagFont = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
`