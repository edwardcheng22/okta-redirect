import CryptoES from 'crypto-es';

// generate a cryptographically random client secret key to verifiy authenticity 
// of the communication between the client and the authorization server
export function generateCodeVerifier() {
    // Ensure CryptoES is properly included and initialized in your environment
    const randomBytes = CryptoES.lib.WordArray.random(32);
    return CryptoES.enc.Base64url.stringify(randomBytes);
  };
  
// encrypts the client secret key string with SHA-256 hash algorithm
// converts results into a URL-safe Base64URL encoded string
export async function generateCodeChallenge(codeVerifier) {
  // Convert the code verifier to a WordArray for hashing
  const wordArray = CryptoES.enc.Utf8.parse(codeVerifier);
  // Hash using SHA-256
  const hash = CryptoES.SHA256(wordArray);
  // Convert the hash to a Base64 URL-safe string
  const base64String = hash.toString(CryptoES.enc.Base64)
                            .replace(/\+/g, '-')
                            .replace(/\//g, '_')
                            .replace(/=+$/, '');
  return base64String;
};
  
export function generateState() {
  // Generate a random WordArray of 16 bytes
  const randomBytes = CryptoES.lib.WordArray.random(16);
  // Convert the WordArray to a hex string
  const state = randomBytes.toString(CryptoES.enc.Hex);
  return state;
};
  
// function to fetch token from okta token endpoint
// async function fetchToken(code, codeVerifier, redirectUri) {
//   const tokenUrl = `${oktaInfo.oktaDomain}/oauth2/v1/token`;
//   console.log(tokenUrl)
//   // const body = `grant_type=authorization_code&` +
//   //              `client_id=${oktaInfo.client_id}&` +
//   //              `redirect_uri=${redirectUri}&` +
//   //              `code=${code}&` +
//   //              `code_verifier=${codeVerifier}`;
//   // console.log(body)
//   const formData = new URLSearchParams();
//   formData.append('grant_type', 'authorization_code');
//   formData.append('client_id', oktaInfo.client_id);
//   formData.append('redirect_uri', redirectUri);
//   formData.append('code', code);
//   formData.append('code_verifier', codeVerifier);
//   console.log(formData.toString());
//   try {
//     const response = await fetch(tokenUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       },
//       body: formData
//     });
//     console.log('Response: ', response)
//     if (!response.ok) { 
//       throw new Error(`HTTP error! status: ${response.status}`);
//     };
//     const data = await response.json();
//     console.log("Response data:", data);
//     if (!data.access_token || !data.id_token || !data.refresh_token || !data.expires_in) {
//       return; 
//     };
//     // Convert expiration from seconds to milliseconds and set expiration time
//     const expirationTime = new Date().getTime() + (data.expires_in * 1000);
//     // Store tokens and token expiry in chrome storage
//     chrome.storage.local.set({
//       'access_token': data.access_token,
//       'id_token': data.id_token,
//       'refresh_token': data.refresh_token,
//       'token_expiry': expirationTime
//     });
//   } catch (error) {
//     console.error('Error fetching token:', error);
//   };
// };

// // refreshes new access token 
// async function refreshAccessToken(refreshToken) {
//   const tokenUrl = `${oktaInfo.oktaDomain}/oauth2/v1/token`;
//   const body = new URLSearchParams({
//     grant_type: 'refresh_token',
//     refresh_token: refreshToken,
//     client_id: oktaInfo.client_id
//   });
//   try {
//     const response = await fetch(tokenUrl, {
//       method: "POST",
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//       body: body.toString()
//     });
//     const data = await response.json();
//     if(!response.ok) {
//       return;
//     };
//     chrome.storage.local.set({
//       'access_token': data.access_token,
//       'refresh_token': data.refresh_token, 
//       'token_expiry': new Date().getTime() + data.expires_in * 1000
//     }, scheduleTokenRefresh());
//   } catch (error) {
//     console.log('Error refreshing access token:', error);
//   };
// };

// // schedule refreshing tokens to ensure longer user sessions without needing to reauthenticate
// async function scheduleTokenRefresh() {
//     const storedData = await chrome.storage.local.get(['refresh_token', 'token_expiry']);
//     const expiresIn = storedData.token_expiry - new Date().getTime();
//     if (expiresIn > 0) {
//       setTimeout(async () => {
//         await refreshAccessToken(storedData.refresh_token); 
//         scheduleTokenRefresh();
//       }, expiresIn - 60000) // schedule a refresh 1 minute before expiry
//     } else {
//       await refreshAccessToken(storedData.refresh_token);
//       scheduleTokenRefresh(); // reschedule after refreshing if already expired
//     };
//   };
  /*
  Add domain mapping in Firebase:
    domainMappings (collection)
      - example.com (document ID)
        - clientId: xxx (field)
        - oktaDomain: "example.okta.com" (field)
  */
  // function addDomainMapping(domain, clientId, oktaDomain) {
  //   return firebaseDB.collection('domainMappings').doc(domain).set({
  //     clientId: clientId,
  //     oktaDomain: oktaDomain
  //   });
  // };


    // const {domain, clientId, oktaDomain } = request.data;
    // addDomainMapping(domain, clientId, oktaDomain);
    // init authorization request which will be sent to Auth0
   