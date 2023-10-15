import styled from "@emotion/styled";

export const KeywordsContainer = styled.div`
  width: auto;
  padding: 0 1.5rem;
  gap: 1rem;
  display: flex;
  margin-top: 1rem;
`

export const KeywordContainer = styled.div`
  width: 9.5rem;
  height: 17rem;
  background-color: #FFF7DA;
  border-radius: 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  margin: 1.5rem 0;
  cursor: pointer;
  &:hover {
    background-color: #FFECAA;
  }
`

export const KeywordImg = styled.img`
  width: 5rem;
  height: 5rem;
`

export const KeywordTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  margin-top: 1rem;
`