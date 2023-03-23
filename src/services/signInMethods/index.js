import firebase from 'firebase/app';
import 'firebase/auth';
import * as GoogleSignIn from 'expo-google-sign-in';
import * as AuthSession from 'expo-auth-session';

export async function GoogleSignInMethod(setLoading) {
  const CLIENT_ID =
    '45615297492-mgmsge5k0jr5ic6gqr7tkteofedlsus0.apps.googleusercontent.com';
  //const REDIRECT_URI = 'https://auth.expo.io/@vinicius.rebelo/transfermate';
  const REDIRECT_URI = 'https://auth.expo.io/@jonathanwssgp/transfermate';
  const SCOPE = encodeURI('profile email');
  const RESPONSE_TYPE = 'token';
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

  try {
    const { type, params } = await AuthSession.startAsync({ authUrl });
    console.log(type);
    console.log(params);
    if (type === 'success') {
      const parameters = JSON.stringify(params);
      const parametersTratados = JSON.parse(parameters);
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${parametersTratados.access_token}`
      );

      const userResponse = await response.json();
      const token = parametersTratados.access_token;

      const googleCredential =
        firebase.auth.GoogleAuthProvider.credential(token);
      console.log('CREDENTIALS: ', googleCredential);
      console.log('USER: ', userResponse);
      setLoading(true);

      let dataG = {
        nome: userResponse.given_name,
        email: userResponse.email,
        socialMidiaToken: token,
        socialMidia: 'Google',
      };
      return {
        dataG,
        googleCredential,
      };
    }
  } catch ({ message }) {
    console.log('login: Error:' + message);
  }
}
