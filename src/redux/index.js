import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import rootReducer from "./reducers";
import initialState from "./initialState";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const middlewares =
  process.env.NODE_ENV !== "production"
    ? [reduxImmutableStateInvariant(), sagaMiddleware]
    : [sagaMiddleware];

export default function configureStore() {
  let store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(rootSaga);
  return store;
}
