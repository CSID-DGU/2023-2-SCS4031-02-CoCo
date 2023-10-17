import styled from "@emotion/styled"

export const HorizontalScrollContainer = styled.div`
  width: 100%;
  height: auto;
  overflow-x: hidden;
  white-space: nowrap;
  display: flex;
  gap: 1.25rem;
  ::-webkit-scrollbar-thumb {
    width: 0;
  }
  scrollbar-width: 0;
  scrollbar-color: transparent transparent;
  
`