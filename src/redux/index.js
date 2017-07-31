import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import initialState from "./initialState";
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, reduxImmutableStateInvariant()];

export default function configureStore() {
  let store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(rootSaga);  

  return store;
}
