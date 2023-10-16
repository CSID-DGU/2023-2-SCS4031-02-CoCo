import styled from "@emotion/styled";

export const TextInputContainer = styled.div<{width:string;}>`
  width: ${({width}) => width};
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const TextInputTitle = styled.div`
  width: auto;
  font-size: 1.2rem;
  font-weight: 500;
  margin-right: 1rem;
`

export const TextInput = styled.input`
  width: 95%;
  height: 1.8rem;
  border: none;
  border-bottom: 1px solid #BEBEBE;
  font-size: 1rem;
  font-weight: 400;
  color: black;
`

export const TextInputError = styled.div`
  width: auto;
  font-size: 0.8rem;
  font-weight: 400;
  color: red;
`

export const TextInputErrorContainer = styled.div`
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: flex-end;
  margin-top: 0.2rem;
`

