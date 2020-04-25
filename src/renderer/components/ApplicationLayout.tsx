import * as React from 'react';

import './ApplicationLayout.scss';

export const ApplicationLayout: React.FunctionComponent = ({ children }) => {
  return (
    <div className='appLayout'>
      <main>
        { children }
      </main>
    </div>
  );
};
