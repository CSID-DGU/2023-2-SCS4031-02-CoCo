import styled from "@emotion/styled"

export const Wrapper = styled.div<{type: any}>`
  width: 100%;
  display: flex;
  align-items: ${props => props.type !== "normal" ? "center" : "flex-start"};
`

export const HorizontalScrollContainer = styled.div`
  width: 100%;
  height: auto;
  overflow-x: hidden;
  white-space: nowrap;
  overflow-y: hidden;
  display: flex;
  gap: 1.25rem;
  ::-webkit-scrollbar-thumb {
    width: 0;
  }
  scrollbar-width: 0;
  scrollbar-color: transparent transparent;
  
`