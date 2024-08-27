import { createStore, applyMiddleware } from "redux";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import createMiddleware from "redux-saga";

import rootReducer from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createMiddleware();

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);

/**
 * store.js creates a store that holds all the data, and index.js sets up how things like actions and reducers will interact with each other.
 */