import { css } from '@emotion/react';

const GlobalStyle = css`
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

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-size: 16px;
    letter-spacing: -0.2px;
  }

  body {
    font-family: 'Pretendard Variable', 'Pretendard', 'Noto Sans KR', 'Nanum Gothic', sans-serif !important;
    color: #000;
    font-size: 14px !important;
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
    width: 1400px;
    margin: 0 auto;
  }

  .btn {
    display: block;
    transition: 0.3s ease;
  }

  .btn-m {
    padding: 12px 24px;
  }

  .btn-round {
    border-radius: 20px;
  }

  .btn-transparent {
    background: transparent;
    border-radius: 20px;
  }
  .btn-transparent:hover {
    background: #f7f7f7;
  }
  .btn-primary {
    background: #000;
    border-radius: 20px;
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
`;

export default GlobalStyle;
