import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/auth";
import { SocketContext, socket } from './contexts/socketContext'
import { GameProvider } from './contexts/gameContext';

ReactDOM.render(
  <Router>
    <AuthProvider>
      <SocketContext.Provider value={socket}>
        <GameProvider>
          <App />
        </GameProvider>
      </SocketContext.Provider>
    </AuthProvider>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
