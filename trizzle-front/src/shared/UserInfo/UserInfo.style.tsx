import styled from "@emotion/styled";

export const Container = styled.div`
  width: 24rem;
  height: 100%;
  display: flex;
  flex-direction:column;
  margin: 2rem auto 0 auto;
  gap: 1rem;
  padding: 0;
`

export const HorizontalContainer = styled.div`
  width: 100%;
  height: 2.4rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export const Title = styled.div`
  width: 6.25rem;
  height: auto;
  font-size: 1.125rem;
  font-weight: 700;
`

export const Content = styled.div`
  width: 17.75rem;
  height: auto;
  color: #747474;
  font-size: 1rem;
  font-weight: 400;
  word-wrap: break-word;
  padding: 0;
`

export const SubmmitButton = styled.button`
  width: 3.5rem;
  height: 2rem;
  display: flex;
  align-items:center;
  justify-content:center;
  position: absolute;
  top: 6rem;
  right: 1rem;
  border: 1px solid #929292;
  color: #929292;
  &:enabled {
    border: none;
    background-color: #EBB700;
    color: #ffffff;
    cursor: pointer;
  }
  &:disabled{
    cursor: not-allowed;
  }
`