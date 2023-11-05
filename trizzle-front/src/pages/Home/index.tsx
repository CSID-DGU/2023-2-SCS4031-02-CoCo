import Page from "../Page";
import { useEffect, useState } from "react";

const Home = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [registrationId, setRegistrationId] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const reIdValue = params.get('reId');
    const reIdResult = decodeURIComponent(reIdValue);
    const dataValue = params.get('data');
    const dataResult = decodeURIComponent(dataValue);
    const tokenValue = params.get('token');
    const tokenResult = decodeURIComponent(tokenValue);

    // 상태를 업데이트
    setRegistrationId(reIdResult);
    setMessage(dataResult);
    setToken(tokenResult);
    console.log(dataResult);
  }, []);

  useEffect(() => {
    const allCookies = document.cookie;
    const cookies = allCookies.split('; ');

    let myCookieValue;

    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name.trim() === 'accessToken') {
        myCookieValue = value;
        break; // 원하는 쿠키를 찾았으므로 반복문 종료
      }
    }

    if (myCookieValue) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);


  return (
    <>
      {registrationId && message && token && (
        <Page
          headersProps={{
            isLogin: isLogin,
            isHome: true,
            isRegistrationId: registrationId,
            isMassage: message,
            isToken: token,
          }}
        />
      )}
    </>
  )

};

export default Home;