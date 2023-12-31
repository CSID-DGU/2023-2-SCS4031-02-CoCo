import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const url = import.meta.env.VITE_API_URL;

const GoogleRedirectPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleOAuthKakao = async (code:any) => {
    try {
      const axiosConfig = {
        withCredentials: true,
      };
      // 카카오로부터 받아온 code를 서버에 전달하여 카카오로 회원가입 & 로그인한다
      const response = await axios.get(`${url}/login/oauth2/code/google?code=${code}`, axiosConfig);
      const data = response.data; // 응답 데이터
      navigate(`/?reId=${data.registration_id}&data=${data.message}&token=${data.token}`);
    } catch (error) { 
      navigate("/fail");
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');  
    if (code) {
      handleOAuthKakao(code);
    }
  }, [location]);

  return (
    <div>
      <div>Processing...</div>
    </div>
  );
};

export default GoogleRedirectPage;