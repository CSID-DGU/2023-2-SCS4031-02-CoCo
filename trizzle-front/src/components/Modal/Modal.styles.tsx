import styled from "@emotion/styled";
import { css } from '@emotion/react';

export const Blur = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
`

export const ModalWrapper = styled.div<{width: string, height: string}>`
  background-color: white;
  border-radius: 1.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: ${props => props.width};
  height: ${props => props.height};
  box-shadow: 0 0 10px rgba(0,0,0,0.25);
  z-index: 100;
`

export const ModalHeader = styled.div`
  width: 100%;
  height: 4.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.4rem 1rem;
  background-color: #FFDC61;
  border-top-left-radius: 1.3rem;
  border-top-right-radius: 1.3rem;
`

export const ModalTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
`

export const ModalCloseButton = styled.button`
  width: 1rem;
  height: 1rem;
  background-color: transparent;
`

export const Icon = css`
  color: black; /* 기본 색상 (검은색) */
  transition: color 0.3s ease; /* 색상 전환 애니메이션 설정 */
  &:hover {
    color: #BA1A1A; /* 마우스를 올렸을 때 색상 */
  }
  width: auto;
  height: 80%;
`