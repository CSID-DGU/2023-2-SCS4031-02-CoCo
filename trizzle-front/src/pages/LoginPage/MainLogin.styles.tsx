import styled from "@emotion/styled";

export const Blur = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
`

export const loginModalWrapper = styled.div`
  background-color: white;
  border-radius: 1.3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 25rem;
  height: 35rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.25);
  z-index: 100;
`

export const userModalWrapper = styled.div`
  background-color: white;
  border-radius: 1.3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 25rem;
  height: 35rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.25);
  z-index: 100;
`

export const loginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 20rem;
  width: 25rem;
  height: 35rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border-radius: 1.5rem;
`;

export const LogoImage = styled.img`
  margin: 1.5rem 0 0 1rem;
  width: 2.5rem;
  height: 2.5rem;
`

export const title = styled.div`
  margin: 1rem 0 0 1rem;
  font-size: 1.5rem;
  font-weight: 700;
`;

export const content = styled.div`
  margin: 1.5rem 0 0 1rem;
  font-size: 1.1rem;
  line-height: 1.2;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0 0 1rem;
  padding: 0 0 4rem 0;
  border-bottom: 1px solid #747474;
`;

export const findContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 1rem;
  margin: 1rem 0 0 1rem;
`;

export const findContents = styled.button`
  font-size: 1rem;
  font-weight: 400;
  &:hover {
    color: #EBB700;
    font-weight: 500;
  }
`;

export const userContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 2rem 0 0 1rem;
`;


export const userContents = styled.div`
  margin: 0 0 1rem 0;
  font-size: 1rem;
  font-weight: 700;
`;

export const userInput = styled.input`
  margin: 0 0 1.5rem 0;
  padding: 0 0 0 0.7rem;
  width: 20rem;
  height: 2.5rem;
  border: 1px solid #9e9e9e;
  border-radius: 0.5rem;
`;

export const checkButton = styled.button`
  width: 100%;
  height: 4rem;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  background-color: #FFECAA;
  font-size: 1.2rem;
  font-weight: 500;
`;

export const Text3 = styled.div`
  margin: 1rem 1rem 2rem 1rem;
  font-size: 0.8rem;
  text-align: center;
`;