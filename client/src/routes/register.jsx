import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import socket from '../socket';
import { User } from '../context';

const Register = () => {
  const history = useHistory();
  const { setUser } = useContext(User);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState({ className: 'text-muted', text: 'nothing will be saved.' });
  const valid = username.length > 1;

  const onRegister = useCallback(e => {
    e.preventDefault();
    if (valid) {
      socket.emit('register', { username });
    }
  }, [ valid, username ]);

  useEffect(() => {
    socket.on('registered', res => {
      if (res.User) {
        setUser(res.User);
        history.push('/');
      } else if (res.message) {
        setMessage({ className: 'text-danger', text: res.message });
      }
    });
  }, [ setUser, history ]);

  return (<div className='col d-flex flex-column justify-content-center'>
    <form className='d-flex justify-content-center' onSubmit={onRegister}>
      <div className='form-group'>
        <label htmlFor='username'>Username:</label>
        <input type='text' className='form-control' id='username' value={username} onChange={e => setUsername(e.target.value)} autoFocus />
        <small className={'form-text ' + message.className}>{message.text}</small>
        <button type='submit' className='btn btn-primary btn-block mt-3' disabled={!valid}>Go</button>
      </div>
    </form>
  </div>);
};

export default Register;