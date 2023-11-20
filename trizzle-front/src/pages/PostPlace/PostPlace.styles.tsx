import styled from "@emotion/styled";

export const PageTitleContainer = styled.div`
  width: 100%;
  height: 9rem;
  position:absolute;
  top: 9.5rem;
  left: 0;
`;

export const PageTitleImage = styled.img`
  width: 100%;
  height: 100%; 
  opacity: 0.5;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1; 
`

export const PageTitle = styled.div`
  font-size: 2rem;
  font-weight: 600;
  position: absolute;
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%); 
  z-index: 1;
`

export const PageTitleContainer2 = styled.div`
  width: 100%;
  height: 9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFF7DA;
  position:absolute;
  top: 9.5rem;
  left: 0;
`;

export const PageTitle2 = styled.div`
  font-size: 2rem;
  font-weight: 600;
`

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

export const BookmarkButtonInnerText = styled.div<{isBookmark:boolean}>`
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
  margin-top: 6rem;
  margin-bottom: 1.5rem;

  font-size: 2rem;
  font-weight: bold;
`

export const InforContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  font-weight: bold;
  font-size: 1.1rem;
`
export const InforInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  font-size: 1rem;
`

export const HorizontalFirstStartContainer = styled.div`
  display: flex;
  justify-content: first-start;
  align-items: center;
  gap: 1rem;
`

export const PostContainer = styled.div`
  margin: 1rem 0 2rem 0;
`

// 댓글
export const CommentContainer = styled.div`
  margin-top: 2rem;
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