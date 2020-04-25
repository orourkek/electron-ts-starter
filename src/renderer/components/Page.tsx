import * as React from 'react';

import './Page.scss';

interface Props {
  title: string;
}

export const Page: React.FunctionComponent<Props> = (props) => {
  const { children, title } = props;

  React.useEffect(() => {
    document.title = `${title}`;
  });

  return (
    <section className='pageContent'>
      <h1>{ title }</h1>
      { children }
    </section>
  );
};
