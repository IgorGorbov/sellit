import axios from 'axios';

import { GET_ARTICLES, ADD_ARTICLE, RESET_ARTICLE } from '../types';
import { FIREBASE } from '../../utils/misc';

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
