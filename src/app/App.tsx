import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from './theming';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Текст писать тут
          </p>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
