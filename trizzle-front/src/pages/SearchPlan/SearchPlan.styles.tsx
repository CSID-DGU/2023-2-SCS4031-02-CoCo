import styled from "@emotion/styled";

export const RegionContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;
  margin: 2rem 0 2rem 0;
`

export const RegionInforContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 40rem;
`

export const RegionName = styled.div`
  margin: 1rem 0 0 0;
  font-size: 2rem;
  font-weight: 800;
`

export const RegionInfor = styled.div`
  margin: 2rem 0 0 0;
  color: #282828;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.7rem;
`

export const SearchContainer = styled.div`
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  color: #747474;
  font-size: 2rem;
  font-weight: 400;
`

export const SearchText = styled.div`
  color: #747474;
  font-weight: 700;
`

export const SearchResultContainer = styled.div`
  margin: 2rem 0;
  border-top: 1px solid #BEBEBE;
`

export const PlanCardContainer = styled.div`
  margin: 2rem 0 0 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
`