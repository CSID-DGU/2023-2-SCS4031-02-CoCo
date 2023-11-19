import styled from "@emotion/styled";

export const RegionContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;
  margin: 7rem 0 2rem 0;
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

export const PlaceCardContainer = styled.div`
  margin: 2rem 0 0 0;
`


export const FilterContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  font-size: 1rem;
  font-weight: 400;
  color: #868686;
  padding: 0.5rem 0;
`

export const MenuContainer = styled.div`
  width: auto;
  max-width: 50rem;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  /* align-items: center; */
  gap: 1rem;
`

export const FilterButton = styled.button`
  width: 1.6rem;
  height: 1.6rem;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  margin: auto 1rem auto 0;
  .icon {
    color: #868686;
    &:hover {
      color: #000;
    }
  }
`