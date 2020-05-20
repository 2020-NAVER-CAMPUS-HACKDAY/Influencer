import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from 'redux/ducks';
import { createWrapper } from 'next-redux-wrapper';
import { rootReducer } from './ducks';


// TODO(daeun): specify stricter types
const configStore = (): Store => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    process.env.NODE_ENV !== 'development'
      ? applyMiddleware(sagaMiddleware)
      : composeWithDevTools(applyMiddleware(sagaMiddleware)),
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export default createWrapper(configStore, { debug: true });
