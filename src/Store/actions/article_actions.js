import axios from 'axios';

import {
  GET_ARTICLES,
  ADD_ARTICLE,
  RESET_ARTICLE,
  DELETE_USER_POST,
} from '../types';
import { FIREBASE, setToken } from '../../utils/misc';
import { autoSignIn } from './user_actions';

export function getArticles(category) {
  let URL = `${FIREBASE}/articles.json`;

  if (category !== 'All') {
    URL = `${URL}/?orderBy=\"category\"&equalTo=\"${category}\"`;
  }

  const request = axios(URL)
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
    .catch(e => false);

  return {
    type: GET_ARTICLES,
    payload: request,
  };
}

export function addArticle(data, token) {
  const request = axios({
    method: 'POST',
    url: `${FIREBASE}/articles.json?auth=${token}`,
    data,
  })
    .then(response => response.data)
    .catch(() => false);

  return {
    type: ADD_ARTICLE,
    payload: request,
  };
}

export function resetArticle() {
  return {
    type: RESET_ARTICLE,
    payload: '',
  };
}

export function deleteUserPost(postId, userData) {
  const promise = new Promise((resolve, reject) => {
    const URL = `${FIREBASE}/articles/${postId}.json`;

    const request = axios({
      method: 'DELETE',
      url: `${URL}?auth=${userData.token}`,
    })
      .then(response => {
        resolve({ deletePost: true });
      })
      .catch(e => {
        const signIn = autoSignIn(userData.refToken);

        signIn.payload.then(response => {
          const newToken = {
            token: response.id_token,
            refToken: response.refresh_token,
            uid: response.user_id,
          };
          setToken(newToken, () => {
            axios({
              method: 'DELETE',
              url: `${URL}?auth=${userData.token}`,
            }).then(() => {
              resolve({
                userData: newToken,
                deletePost: true,
              });
            });
          });
        });
      });
  });

  return {
    type: DELETE_USER_POST,
    payload: promise,
  };
}
