// src/App.js

import React, { useState } from "react";
import "./Newtab/Newtab.css";

function Newtab() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const domain = email.split('@')[1];
    if (!domain) {
      return;
    };
    // Send message to the background script to handle the OAuth flow
    window.postMessage({
      type: 'triggerOAuthOkta',
      data: {
        domain: domain,
        clientId: '0oadhnhwlcsW6UfZw697',
        oktaDomain: 'https://trial-4220785.okta.com'
      }
    }, '*');
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

export default Newtab;
