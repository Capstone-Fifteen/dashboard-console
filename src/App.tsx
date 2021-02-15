import React from 'react';
import './App.css';
import 'rsuite/dist/styles/rsuite-dark.css';
import AuthenticatedContainer from './container/AuthenticatedContainer';

function App() {
  return (
    <div className="App">
      <AuthenticatedContainer />
    </div>
  );
}

export default App;
