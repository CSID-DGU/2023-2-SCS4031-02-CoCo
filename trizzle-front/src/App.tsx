import { Global } from '@emotion/react';
import GlobalStyle from './GlobalStyle';
import Router from './route';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <Global styles={GlobalStyle} />
      <Router />
    </RecoilRoot>
  );
}

export default App;