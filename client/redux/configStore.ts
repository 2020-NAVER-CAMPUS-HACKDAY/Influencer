import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { rootReducer, Types } from './ducks';

const configStore = (): Store<Types> => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    process.env.IS_PRODUCTION
      ? applyMiddleware(sagaMiddleware)
      : composeWithDevTools(applyMiddleware(sagaMiddleware)),
  );
  return store as unknown as Store;
};

export default configStore;
