import axios from 'axios';

import { REGISTER_USER, LOGIN_USER, AUTO_SIGN_IN } from '../types';
import { SIGNUP, SIGNIN, REFRESH } from '../../utils/misc';

export function signUp(data) {
  const request = axios({
    method: 'POST',
    url: SIGNUP,
    data: {
      email: data.email,
      password: data.password,
      returnSecureToken: true,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.data)
    .catch(e => false);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function signIn(data) {
  const request = axios({
    method: 'POST',
    url: SIGNIN,
    data: {
      email: data.email,
      password: data.password,
      returnSecureToken: true,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.data)
    .catch(e => false);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function autoSignIn(refToken) {
  const request = axios({
    method: 'Post',
    url: REFRESH,
    data: `grant_type=refresh_token&refresh_token=${refToken}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then(response => response.data)
    .catch(e => false);

  return {
    type: AUTO_SIGN_IN,
    payload: request,
  };
}
