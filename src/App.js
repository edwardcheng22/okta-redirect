import React, { useState } from "react";
import './App.css';
import {
  generateCodeChallenge, 
  generateCodeVerifier, 
  generateState 
} from './helper.js'

function App() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const domain = email.split('@')[1];
    if (!domain) {
      return;
    }

    const clientId = '0oadhnhwlcsW6UfZw697';
    const oktaDomain = 'https://trial-4220785.okta.com';
    const REDIRECT_URL = "https://edwardcheng22.github.io/okta-redirect"; 
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const state = generateState();

    // Store codeVerifier and state in localStorage
    localStorage.setItem('codeVerifier', codeVerifier);
    localStorage.setItem('state', state);

    // Construct authorization URL
    const authURL = `${oktaDomain}/oauth2/v1/authorize?` + 
              `client_id=${clientId}&` +
              `response_type=code&` + 
              `scope=openid&` +
              `redirect_uri=${encodeURIComponent(REDIRECT_URL)}&` +
              `code_challenge_method=S256&` + 
              `code_challenge=${codeChallenge}&` + 
              `state=${encodeURIComponent(state)}`;

    console.log('Authorization URL:', authURL);

    // Redirect the current web page to the auth URL link
    window.location.href = authURL;
    console.log(localStorage)
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default App;
