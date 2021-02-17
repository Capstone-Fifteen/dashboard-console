import React from 'react';
import AuthenticatedContainer from './container/AuthenticatedContainer';
import { BrowserRouter } from 'react-router-dom';

import 'rsuite/dist/styles/rsuite-dark.css';

function App() {
  return (
    <BrowserRouter>
      <AuthenticatedContainer />
    </BrowserRouter>
  );
}

export default App;
