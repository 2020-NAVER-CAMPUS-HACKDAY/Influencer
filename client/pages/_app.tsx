import React, { ReactElement } from 'react';
import { AppProps } from 'next/app';
import configStore from 'redux/configStore';

const PageApp = ({
  Component,
  pageProps,
}: AppProps): ReactElement => (
  <Component {...pageProps} />
);

export default configStore.withRedux(PageApp);
