import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/auth";

ReactDOM.render(
  <Router>
        <AuthProvider>
                <App />
        </AuthProvider>
    </Router>,
  document.getElementById('root')
);

reportWebVitals();
