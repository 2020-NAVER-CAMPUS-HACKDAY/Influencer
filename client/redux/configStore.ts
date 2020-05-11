import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
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
  return store;
};

export default configStore;
