import { css } from '@emotion/react';

const GlobalStyle = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    letter-spacing: -0.2px;
  }

  @media screen and (min-width:1024px){
    html {
    font-size: 16px !important;
    }
  }

  @media screen and (min-width:768px) and (max-width: 1023px) {
	/* Tablet */
  html {
    font-size: 12px !important;
  }
  }
  @media screen and (max-width:767px){ 
    /* Mobile */
  html {
    font-size: 8px !important;
  }
  }

  @font-face {
    font-family: 'Pretendard Variable';
    font-weight: 45 920;
    font-style: normal;
    font-display: swap;
    src: url('/fonts/pretendard/PretendardVariable.woff2') format('woff2-variations');
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/pretendard/Pretendard-Thin.woff') format('font-woff');
    font-weight: 100;
    font-display: swap;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/pretendard/Pretendard-ExtraLight.woff') format('font-woff');
    font-weight: 200;
    font-display: swap;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/pretendard/Pretendard-Light.woff') format('font-woff');
    font-weight: 300;
    font-display: swap;
  }
  @font-face {
    font-family: 'Pretendard';
    /* src: url('/fonts/pretendard/Pretendard-Regular.woff') format('font-woff'); */
    src: url('/fonts/pretendard/Pretendard-Regular.woff') format('font-woff');
    font-weight: 400;
    font-display: swap;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/pretendard/Pretendard-Medium.woff') format('font-woff');
    font-weight: 500;
    font-display: swap;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/pretendard/Pretendard-SemiBold.woff') format('font-woff');
    font-weight: 600;
    font-display: swap;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/pretendard/Pretendard-Bold.woff') format('font-woff');
    font-weight: 700;
    font-display: swap;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/pretendard/Pretendard-ExtraBold.woff') format('font-woff');
    font-weight: 800;
    font-display: swap;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/pretendard/Pretendard-Black.woff') format('font-woff');
    font-weight: 900;
    font-display: swap;
  }

  body {
    font-family: 'Pretendard Variable', 'Pretendard', 'Noto Sans KR', 'Nanum Gothic', sans-serif !important;
    color: #000;
    font-size: 1rem;
  }



  a {
    text-decoration: none;
    cursor: pointer; /*color:#777;*/
  }
  a:link,
  a:visited {
    color: #000;
    text-decoration: none;
  }
  a:hover,
  a:active,
  a:focus {
    text-decoration: none;
  }
  button {
    font-family: 'Pretendard Variable', 'Pretendard', 'Noto Sans KR', 'Nanum Gothic', sans-serif !important;
    border: none; cursor: pointer;background-color: transparent;
  }

  .container {
    width: 87.5rem;
    margin: 0 auto;
  }

  .btn {
    display: block;
    transition: 0.3s ease;
  }

  .btn-m {
    padding: 0.75rem 1.5rem;
  }

  .btn-round {
    border-radius: 1.25rem;
  }

  .btn-transparent {
    background: transparent;
    border-radius: 1.25rem;
  }
  .btn-transparent:hover {
    background: #f7f7f7;
  }
  .btn-primary {
    background: #000;
    border-radius: 1.25rem;
    color: #fff;
  }
  a.btn-primary {
    color: #fff;
  }

  /* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  ::-webkit-scrollbar {
    width: 0.5rem; /* 스크롤바의 너비 */
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: #D9D9D9; /* 스크롤바 색상 */
    border-radius: 0.2rem; /* 스크롤바의 둥근 테두리 */
  }
`;

export default GlobalStyle;
