import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

export const initialState = {
  watchlists: []
};

export default function configureStore() {
   return createStore(
      rootReducer,
      initialState,
      applyMiddleware(reduxImmutableStateInvariant())
   );
}

