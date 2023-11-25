import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: auto;
  padding: 1rem 0.5rem;
  display: flex;
  justify-content: flex-start;
`

export const ContentContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
` 

export const TextArea = styled.textarea`
  width: 97%;
  height: fit-content;
  word-wrap: break-word;
  border: none;
  border-bottom: 1px solid #bdbdbd;
  font-size: 0.9rem;
  line-height: 1.1rem;
  font-weight: 400;
`

export const SaveButton = styled.button`
  width: 3.5rem;
  height: 2rem;
  border: 1px solid #bdbdbd;
  color: #bdbdbd;
  font-size: 0.8rem;
  font-weight: 400;
  background-color: transparent;
  margin-top: 0.3rem;
  border-radius: 0.5rem;
  &:enabled {
    border: none;
    background-color: #EBB700;
    color: #ffffff;
    cursor: pointer;
  }
`