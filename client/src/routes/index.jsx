import React from 'react';

import { useAuth } from '../hooks';

const Index = () => {

  useAuth();

  return (<div>
    Index
  </div>);
};

export default Index;