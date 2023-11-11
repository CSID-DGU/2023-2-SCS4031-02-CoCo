import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const Wrapper = styled.div`
  width: 100%;
  height: 23rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-wrap: wrap;
  margin-top: 1.5rem;
  border-radius: 1rem;
`

export const Container = styled.div`
  width: 100%;
  height: 23rem;
  display: flex;
  position: relative;
  border-radius: 1rem;
`

export const Tumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const ContentContainer = styled.div`
  width: 60%;
  height: 100%;
  border-bottom-left-radius: 1rem;
  border-top-left-radius: 1rem;
  background-color: rgba(255, 255, 255, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 4rem;
`

export const Title = styled.div`
  width: 100%;
  font-size: 3rem;
  font-weight: 600;
  word-wrap: break-word;
`

export const TagContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 1.6rem;
`

export const Tag = styled.div`
  width: auto;
  font-size: 1.5rem;
  font-weight: 400;
  margin-right: 1rem;
`

export const DetailLink = styled.div`
  width: auto;
  margin-top: 7.5rem;
  font-size: 1.5rem;
  font-weight: 400;
  cursor: pointer;
  color: #000;
  font-style: underline;
  color: #8c8c8c;
  &:hover {
    color: #000;
  }
`

export const sliderStyle = css`

`

export const sliderStyleActive = css`
 
`



