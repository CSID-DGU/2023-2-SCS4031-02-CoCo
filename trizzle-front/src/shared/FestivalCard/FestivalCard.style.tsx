import styled from "@emotion/styled";

export const Container = styled.div`
  width: 19.25rem;
  min-width: 19.25rem;
  height: 21rem;
  border-radius: 0.75rem;
  position: relative;
  margin-right: 1.3rem;
  margin-left: 1.1rem;
`

export const Tumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.75rem;
`

export const ContentContainer = styled.div`
  width: 100%;
  height: 30%;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  border-bottom-left-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.7);
`

export const Title = styled.div`
  font-size: 1rem;
  font-weight: 500;
`

export const Date = styled.div`
  font-size: 0.8rem;
  font-weight: 400;
  margin-top: 0.5rem;
`