import React from 'react';
import AuthenticatedContainer from './container/AuthenticatedContainer';
import { BrowserRouter } from 'react-router-dom';
import UnauthenticatedContainer from './container/UnauthenticatedContainer';
import { useAppSelector } from './redux/hook';
import 'rsuite/dist/styles/rsuite-dark.css';

const App = () => {
  const isAuthenticated = useAppSelector((state) => state.authenticated);

  return <BrowserRouter>{isAuthenticated ? <AuthenticatedContainer /> : <UnauthenticatedContainer />}</BrowserRouter>;
};

export default App;
