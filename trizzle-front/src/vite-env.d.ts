/// <reference types="vite/client" />

interface ImportMetaEnv {
  //.env 파일에 있는 변수들을 여기에 정의해주세요! ts 파일 작성하는 것처럼 미리 타입을 지정해주는 겁니다
  //예시 : readonly VITE_APP_API_URL: string; -> .env 파일 변수는 꼭 앞에 VITE를 붙여야 읽어올 수 있습니다.
  readonly VITE_KAKAO_API_KEY: string;
  readonly VITE_NAVER_CLIENT_ID: string;
  readonly VITE_NAVER_CLIENT_SECRET: string;
};

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
