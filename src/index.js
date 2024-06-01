import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App.js';
import OAuthCallback from './components/OAuthCallback.js';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/callback" element={<OAuthCallback />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
