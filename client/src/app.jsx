import React, { useState } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import { User } from './context';
import Index from './routes/index';
import Register from './routes/register';

const App = () => {
  const [ user, setUser ] = useState(null);

  return (<HashRouter basename='/'>
    <User.Provider value={{ user, setUser }}>
      <Switch>
        <div className='container-fluid'>
          <div className='row'>
            <Route path='/register' component={Register} exact />
            <Route path='/' component={Index} exact />
          </div>
        </div>
      </Switch>
    </User.Provider>
  </HashRouter>);
};

export default App;