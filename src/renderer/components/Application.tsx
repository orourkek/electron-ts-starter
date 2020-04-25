import { remote } from 'electron';
import * as React from 'react';
import { ApplicationLayout } from './ApplicationLayout';
import { LoadingScreen } from './LoadingScreen';
import { Page } from './Page';

export const Application: React.FunctionComponent = () => {
  const [ loading, setLoading ] = React.useState<boolean>(false);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ApplicationLayout>
      <Page title='Home'>
        <p>Hello, world!</p>
      </Page>
    </ApplicationLayout>
  );
};
