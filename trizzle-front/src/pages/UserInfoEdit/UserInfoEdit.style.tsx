import styled from "@emotion/styled";

export const Container = styled.div<{tab: string}>`
  width: 50rem;
  height: 40rem;
  max-height: 40rem;
  position:relative;
  display: flex;
  padding: 0.6rem 2rem;
  margin: 5rem auto;
  border-radius: 2rem;
  flex-direction:column;
  border: 0.1rem solid #BEBEBE;
  background-color: white;
  overflow-y: ${props => props.tab ==="회원 정보"? "none" : "auto"} ;
`

export const TabContainer = styled.div`
  width: 15rem;
`