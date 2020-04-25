import * as React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export const LoadingScreen: React.FunctionComponent = () => {
  const style: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate3d(-50%, -50%, 0)',
  };
  return (
    <div style={ style }>
      <LoadingSpinner.Light />
    </div>
  );
};
