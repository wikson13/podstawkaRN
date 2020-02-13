import {combineReducers} from 'redux';
import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import {composeWithDevTools} from 'redux-devtools-extension';
import authReducer from '../auth/authReducer';
import counterReducer from '../counter/counterReducer';

const reducers = combineReducers({
  auth: authReducer,
  counter: counterReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);
sagaMiddleware.run(rootSaga);

export default store;
