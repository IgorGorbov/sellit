import axios from 'axios';

import {
  REGISTER_USER,
  LOGIN_USER,
  AUTO_SIGN_IN,
  GET_ARTICLES,
  GET_USER_POSTS,
} from '../types';
import { SIGNUP, SIGNIN, REFRESH, FIREBASE } from '../../utils/misc';

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

export function getUserPosts(UID) {
  const request = axios(
    `${FIREBASE}/articles.json?orderBy=\"uid\"&equalTo=\"${UID}\"`
  )
    .then(response => {
      const articles = [];
      for (const key in response.data) {
        articles.push({
          ...response.data[key],
          id: key,
        });
      }

      return articles;
    })
    .catch(() => false);

  return {
    type: GET_USER_POSTS,
    payload: request,
  };
}
