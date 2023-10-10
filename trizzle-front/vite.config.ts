import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import {createHtmlPlugin} from 'vite-plugin-html';

export default ({ mode }) => {  
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  // process에서 타입에러가 뜨게된다.
  // @type/node를 설치해주자
  return {
    plugins: [
      react(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            kakaoKey: process.env.VITE_KAKAO_API_KEY,
            naverClient: process.env.VITE_NAVER_CLIENT_ID,
            naverClientSecret: process.env.VITE_NAVER_CLIENT_SECRET,
          }
        }
      }),
    ],
  }
}