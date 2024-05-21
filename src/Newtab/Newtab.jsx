import React, { useState } from "react";
import "./Newtab.css";
import "./Newtab.scss";

function Newtab () {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // grab the email domain to map to the client id and okta domain
    const domain = email.split('@')[1];
    if (!domain) {
      return;
    };
    // Send message to background script to handle the Firestore add
    chrome.runtime.sendMessage({
      type: 'triggerOAuthOkta',
      data: {
        domain: domain,
        clientId: '0oadhnhwlcsW6UfZw697',
        oktaDomain: 'https://trial-4220785.okta.com'
      }
    })
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
};

export default Newtab;
