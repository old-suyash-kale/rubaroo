import { useCallback, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { BASE_URL } from './configs';
import { User } from './context';

export const useRequest = () => {
  const { user } = useContext(User);

  return useCallback((url, o) => new Promise((resolve, reject) => {
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
};

export const useAuth = () => {
  const { user } = useContext(User);
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push('/register');
    }
  }, [user, history]);
};