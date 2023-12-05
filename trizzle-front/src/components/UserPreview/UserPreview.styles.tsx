import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10rem 0 0 0;
  width: auto;
  height: auto;
  border: 1px solid #BDBDBD;
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
  padding-left: 1rem;
`
export const VerticalFirstStartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: first-start;
  gap: 0.5rem;
`

export const UserImage = styled.div`
  margin: 0.5rem 0.5rem 0.5rem 1rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #D9D9D9;
`

export const UserIdText = styled.div`
  margin: 0.5rem 0 0 0;
  font-size: 1rem;
  font-weight: bold;
`

export const UserKeywordTag = styled.div`
  margin: 0 0 0.5rem 0;
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