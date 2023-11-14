import styled from "@emotion/styled";

export const ParentCommentContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  margin: 0 2rem;
`

export const ChildMoreButton = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
  padding-left: 4rem;
  justify-content: flex-start;
  cursor: pointer;
  font-size: 0.8rem;
  color: #bdbdbd;
  font-weight: 400;
  gap: 0.5rem;
  &:hover {
    color: #000000;
  }
  .icon {
    color: #bdbdbd;
    &:hover {
      color: #000000;
    }
  }
`

export const ChildCommentContainer = styled.div`
  width: 95%;
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

export const PostCommentContainer = styled.div`
  width: 100%;
  padding: 0.5rem;
  height: auto;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
`

export const PostCommentContent = styled.div`
  width: 70%;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.5rem;
`

export const PostCommentContentHeader = styled.div`
  width: 100%;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`

export const PostCommentContentDate = styled.div`
  width: auto;
  margin-left: 0.75rem;
  font-size: 0.9rem;
  color: #C5C5C5;
  font-weight: 400;
`

export const PostCommentContentBody = styled.div`
  width: 90%;
  font-size: 0.9rem;
  font-weight: 400;
  word-wrap: break-word;
  line-height: 1.1rem;
`

export const PostCommentContentFooter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`
export const PostCommentContentFooterLike = styled.div`
  width: auto;
  margin-left: 0.6rem;
  font-size: 0.9rem;
  color: #676767;
  font-weight: 400;
`

export const PostCommentContentFooterReply = styled.div`
  width: auto;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  margin-left: 2rem;
  font-size: 0.9rem;
  font-weight: 400;
  padding: 0 0.5rem;
  cursor: pointer;  
  &:hover {
    background-color: #e9ecef;
  }
`

export const Fixed = styled.div`
  width: auto;
  height: 1rem;
  font-size: 0.9rem;
  font-weight: 400;
  color: #C5C5C5;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const MyCommentContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid #D6D6D6;
  border-top: 1px solid #D6D6D6;
  padding: 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: -1px;
  gap: 0.5rem;
  &:hover {
    background-color: #F6F6F6;
  }
`

export const MyCommentContent = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;

`

export const MyCommentContentText = styled.div`
  width: 80%;
  height: auto;
  font-size: 1rem;
  font-weight: 400;
  word-wrap: break-word;
  line-height: 1.1rem;
`

export const MyCommentDeleteButton = styled.button`
  width: auto;
  height: auto;
  font-size: 0.9rem;
  font-weight: 400;
  color: #B8B8B8;
  background-color: transparent;
  border: none;
  &:hover {
    color: #E70000;
  }
`
export const MyCommentPostText = styled.div`
  width: auto;
  height: auto;
  font-size: 0.9rem;
  font-weight: 400;
  color: #B8B8B8;
`