import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function OAuthCallback() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const returnedState = params.get('state');

    console.log('Authorization code:', code);
    console.log('Returned state:', returnedState);

    if (!code) {
      console.error('No authorization code found in the URL.');
      return;
    }

    const storedState = localStorage.getItem('state');
    if (storedState !== returnedState) {
      console.error('State parameter mismatch');
      return;
    }

    const codeVerifier = localStorage.getItem('codeVerifier');
    if (!codeVerifier) {
      console.error('No code verifier found in localStorage.');
      return;
    }

    const clientId = '0oadhnhwlcsW6UfZw697';
    const oktaDomain = 'https://trial-4220785.okta.com';
    const REDIRECT_URL = 'https://edwardcheng22.github.io/okta-redirect';

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
        code_verifier: codeVerifier,
      }),
    })
      .then(response => {
        console.log('Token request response:', response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Access Token:', data.access_token);
        // Optionally store the access token in localStorage for later use
        localStorage.setItem('accessToken', data.access_token);
        navigate('/'); // Redirect to the home page after processing
      })
      .catch(error => {
        console.error('Error exchanging code for token:', error);
      });
  }, [location, navigate]);

  return <div>Processing OAuth callback...</div>;
}

export default OAuthCallback;
