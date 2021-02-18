import { useCallback, useContext } from 'react';

import { BASE_URL } from './configs';
import { User } from './context';

export const useRequest = () => {
  const { user } = useContext(User);

  const request = useCallback((url, o) => new Promise((resolve, reject) => {
    fetch(BASE_URL + url, {
      method: 'GET',
      ...o,
      headers: { token: user.id },
      mode: process.env.NODE_ENV === 'development' ? 'cors' : 'same-origin',
    }).then(res => {
      res.json().then(data => {
        if (res.status === 200) {
          resolve(data);
        } else {
          reject(data);
        }
      }, reject);
    }, reject);
  }), [ user ]);

  return request;
};