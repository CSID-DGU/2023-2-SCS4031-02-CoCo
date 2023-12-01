import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  min-height: 85vh;
  margin: 0;
  padding: 0;
`

export const HorizontalCenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 2rem;
`

export const VerticalCenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`

export const Text6 = styled.div`
  font-size: 8rem;
  font-weight: 800;
  color: #FFC700;
`

export const Text5 = styled.div`
  font-size: 5rem;
  font-weight: 700;
`

export const Text4 = styled.div`
  font-size: 2rem;
  font-weight: 500;
`

export const Text3 = styled.div`
  font-size: 1rem;
  font-weight: 400;
`

export const HomeButton = styled.button`
  padding: 0.5rem;
  border: 1px solid #B4B4B4;
  border-radius: 0.8rem;
  color: #B4B4B4;
  &:hover {
    border: 1px solid #949494;
    color: #949494;
  }
`

export const HomeLogo = styled.img`
  margin: 0 0 0 1rem;
`