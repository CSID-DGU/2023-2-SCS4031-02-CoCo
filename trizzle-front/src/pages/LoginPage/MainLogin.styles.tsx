import styled from "@emotion/styled";

export const Blur = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 500;
`

export const LoginModalWrapper = styled.div`
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
  z-index: 600;
`

export const UserModalWrapper = styled.div`
  background-color: white;
  border-radius: 1.3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 25rem;
  height: 35rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.25);
  z-index: 100;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const LogoImage = styled.img`
  margin: 1.5rem 0 0 0;
  width: 2.5rem;
  height: 2.5rem;
`

export const Title = styled.div`
  margin: 1rem 0 0 0;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
`;

export const Content = styled.div`
  margin: 1.5rem 0 0 0rem;
  font-size: 1.1rem;
  line-height: 1.2;
  text-align: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
  margin: 3rem 0 0 1rem;
  padding: 0 0 4rem 0;
  border-bottom: 1px solid #747474;
`;


export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /* margin: 2rem 0 0 0; */
  padding: 2rem 2rem 0 2rem;
`;

export const UserContents = styled.div`
  margin: 0 0 1rem 0;
  font-size: 1rem;
  font-weight: 700;
`;

export const UserInput = styled.input`
  margin: 0 0 1.5rem 0;
  padding: 0 0 0 0.7rem;  
  width: 20rem;
  height: 2.5rem;
  border: 1px solid #9e9e9e;
  border-radius: 0.5rem;
`;

export const CheckButton = styled.button`
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
`;