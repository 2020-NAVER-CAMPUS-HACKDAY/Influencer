import React, { ReactElement } from 'react';
import { AppProps } from 'next/app';
import useScrollRestoration from 'hooks/useScrollRestoration';
import configStore from 'redux/configStore';

const PageApp = ({ Component, pageProps }: AppProps): ReactElement => {
  useScrollRestoration();
  return <Component {...pageProps} />;
};

export default configStore.withRedux(PageApp);
