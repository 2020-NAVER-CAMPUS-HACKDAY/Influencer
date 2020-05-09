import React, { ReactElement } from 'react';
import { AppProps } from 'next/app';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import configStore from 'redux/configStore';

interface PageAppProps {
  store: Store;
}
const PageApp = ({
  Component,
  pageProps,
  store,
}: AppProps & PageAppProps): ReactElement => (
  <Provider store={store}>
  <Component {...pageProps} />
</Provider>
);

export default withRedux(configStore)(PageApp);
