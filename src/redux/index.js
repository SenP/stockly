import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import initialState from "./initialState";
import { loadWatchlists } from "./actions/watchlistsActions";

export default function configureStore() {
  let store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(reduxImmutableStateInvariant()))
  );

  store.dispatch(loadWatchlists());

  return store;
}
