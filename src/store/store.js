import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger/src';
import reducer from './root-reducer';
import rootSaga from './user-sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = createStore(reducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export default store;
