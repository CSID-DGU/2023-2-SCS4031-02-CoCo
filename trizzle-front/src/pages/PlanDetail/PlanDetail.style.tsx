import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction:column;
  gap: 1rem;
  margin-bottom: 10rem;
`

export const ButtonContainer = styled.div`
  width: 100%;
  height: 3.25rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.7rem;
`

export const ListButton = styled.button`
  width: 6.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  background-color: #ffffff;
  border: 2px solid #9E9E9E;
  color: #9E9E9E;
  font-size: 1rem;
  font-weight: 400;
  cursor: pointer;
  &:hover {
    border:2px solid #505050;
    color: #505050;
  }
`

export const ModButton = styled.button`
  width: 6.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  background-color: #ffffff;
  border: 2px solid #FCC400;
  color: #FCC400;
  font-size: 1rem;
  font-weight: 400;
  cursor: pointer;
  &:hover {
    border:2px solid #fcc500d6;
    color: #fcc500d6;
  }
`

export const HorizontalContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  gap: 1rem;
  align-items: center;
`

export const Title = styled.div`
  width: 10%;
  height: auto;
  font-size: 1.1rem;
  font-weight: 500;
`

export const Content = styled.div`
  width: 90%;
  height: auto;
  font-size: 1.1rem;
  font-weight: 400;
  color: #747474;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const ThemaBadge = styled.div`
  width: auto;
  height: 2rem;
  border-radius: 0.5rem;
  background-color: #FFECAA;
  display: flex;
  padding: 1rem 1rem;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 500;
  color: #747474;
`