import * as React from 'react';

import './LoadingSpinner.scss';

interface Props {
  size?: number;
  color?: string;
  backgroundColor?: string;
}

interface LoadingSpinnerType<P> extends React.FunctionComponent<P> {
  Light: React.FunctionComponent<{ color?: string; }>;
  Dark: React.FunctionComponent<{ color?: string; }>;
}

export const LoadingSpinner: LoadingSpinnerType<Props> = (props) => {
  const style: React.CSSProperties = {
    borderTopColor: props.color,
    borderRightColor: props.backgroundColor,
    borderBottomColor: props.backgroundColor,
    borderLeftColor: props.backgroundColor,
    fontSize: props.size ? (props.size / 10) : undefined,
  };
  return (
    <div className='loading-spinner' style={ style }>
      Loading...
    </div>
  );
};

LoadingSpinner.Light = ({ color }) => (
  <LoadingSpinner
    color={ color || 'white' }
    backgroundColor='rgba(255, 255, 255, 0.15)'
  />
);

LoadingSpinner.Dark = ({ color }) => (
  <LoadingSpinner
    color={ color || 'black' }
    backgroundColor='rgba(0, 0, 0, 0.15)'
  />
);
