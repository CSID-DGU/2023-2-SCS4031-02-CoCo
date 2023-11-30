import styled from "@emotion/styled";

export const ModifiedButton = styled.button`
  margin-left: 1rem;
  width: 7rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  background-color: #ffffff;
  border: 1px solid #BEBEBE;
  font-size: 1rem;
  font-weight: 400;
  color: #BEBEBE;
  cursor: pointer;
  &:hover {
    border:2px solid #EBB700;    
    color: #EBB700;
  }
`

export const BookmarkButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const BookmarkButtonInnerText = styled.div<{isBookmark: boolean}>`
  margin: 0 0 0 0.3rem; 
  font-size: 1rem;
  font-weight: 400;
  &:hover {
    font-weight: 700;
  }
  ${props => props.isBookmark && `
    font-weight: 700;
  `}
`

export const InforFirstContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 7rem;
  margin-bottom: 1.5rem;
  position: relative;
  font-size: 2rem;
  font-weight: bold;
`

export const InforContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  width: auto;
  font-weight: bold;
  font-size: 1.1rem;
`
export const InforInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  font-size: 1rem;
`

export const Content = styled.div`
  width: auto;
  height: auto;
  font-size: 1.1rem;
  font-weight: 400;
  color: #747474;
  display: flex;
  align-items: center;
  gap: 0.7rem;
`

export const ThemaBadge = styled.div`
  width: auto;
  height: 2rem;
  border-radius: 0.5rem;
  background-color: #FFECAA;
  display: flex;
  padding: 1rem 1rem;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 500;
  color: #747474;
`

export const HorizontalFirstStartContainer = styled.div`
  display: flex;
  justify-content: first-start;
  align-items: center;
  gap: 1rem;
`

export const HorizontalContainer = styled.div`
  display: flex;
  justify-content: first-start;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0 0 0;
`


export const MapAndDayPlanContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
`

export const DayPlanPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  width: 45%;
  height: 34rem;
  border: 2px solid #FFDC61;
  position: relative;
  top: -0.5rem;
  padding: 1rem;
`

export const DayPlanPostInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: thin;
`

export const DayPlanCopyButton = styled.button`
  margin: 0 0 0.5rem 0;
  width: 28rem;
  text-align: end;
`



export const PostContainer = styled.div`
  margin: 1rem 0 2rem 0;
`

// 댓글
export const CommentContainer = styled.div`
  margin: 2rem 0 5rem 0;
  width: auto;
  height: auto;
  border-top: 1px solid black;
`

export const CommentText = styled.div`
  margin: 0.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const CommentTextNumber = styled.div`
  margin: 0 0.5rem 0 0.3rem;
  width: 1.3rem;
  height: 1.3rem;
  font-size: 0.8rem;
  font-weight: 400;
  color: #FFFFFF;
  background-color: #FF0000;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const CommentTextContainer = styled.div`
  display: flex;
  justify-content: first-start;
  align-items: center;
  width: auto;
  height: auto;
`

export const CommentVerticalFirstStartContainer = styled.div`
  margin: 0.5rem 0 0.5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: first-start;
`


export const CommentIdText = styled.div`
  margin: 1rem 0 0 0;
  font-size: 1.2rem;
  font-weight: bold;
`

export const CommentContent = styled.div`
  margin: 0.5rem 0 0 0;
  font-size: 1rem;
`

export const RecommendContainer = styled.div`
  margin: 3rem 0 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const RecommendText = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
`

export const CopyPlanContainer = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const FlexEndContainer = styled.button`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
`

export const CopyPlan = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.5rem 0;
`

export const CopyPlanText = styled.button`
  margin: 0 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 400;
`