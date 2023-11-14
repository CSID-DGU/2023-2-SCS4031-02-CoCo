import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: auto;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: flex-start;
`

export const ContentContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
` 

export const TextArea = styled.textarea`
  width: 100%;
  height: auto;
  min-height: 1.5rem;
  border-bottom: 1px solid #404040;
  font-size: 0.9rem;
  line-height: 1.1rem;
  font-weight: 400;
`

export const SaveButton = styled.button`
  width: 5rem;
  height: 2.5rem;
  border: 1px solid #bdbdbd;
  color: #bdbdbd;
  font-size: 0.9rem;
  font-weight: 400;
  background-color: transparent;
  margin-top: 0.3rem;
  &:enabled {
    border: none;
    background-color: #EBB700;
    color: #ffffff;
    cursor: pointer;
  }
`