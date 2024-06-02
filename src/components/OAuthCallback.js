import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function OAuthCallback() {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');

    if (code) {
      // Exchange the authorization code for an access token
      const clientId = '0oadhnhwlcsW6UfZw697';
      const oktaDomain = 'https://trial-4220785.okta.com';
      const REDIRECT_URL = 'https://edwardcheng22.github.io/okta-redirect/';

      fetch(`${oktaDomain}/oauth2/v1/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: clientId,
          grant_type: 'authorization_code',
          redirect_uri: REDIRECT_URL,
          code: code,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Access Token:', data.access_token);
        })
        .catch(error => {
          console.error('Error exchanging code for token:', error);
        });
    }
  }, [location]);

  return <div>Processing OAuth callback...</div>;
}

export default OAuthCallback;
