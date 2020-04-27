import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
//we can directly use ./reducers as our root reducer is named index

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    //using compose just so we can use redux dev tool extension in chrome and apply middleware together
    applyMiddleware(...middleware)

  )
);

export default store;
