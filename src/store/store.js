import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
import CircularJSON from "circular-json";

// saves the current state of the application to localstorage for preventing state to be lost
function saveStateTOLocalStorage(state) {
  const serilizedState = CircularJSON.stringify(state);
  localStorage.setItem("reduxstate", serilizedState);
}

function loadFromLocalStorage() {
  const serilizedState = localStorage.getItem("reduxstate");
  if (serilizedState === null) return undefined;
  return typeof serilizedState === "object"
    ? serilizedState
    : JSON.parse(serilizedState);
}

const persistedState = loadFromLocalStorage();

const middleware = window.__REDUX_DEVTOOLS_EXTENSION__
  ? compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__())
  : applyMiddleware(thunk);

// Note: this API requires redux@>=3.1.0
const store = createStore(rootReducer, persistedState, middleware);

store.subscribe(() => {
    saveStateTOLocalStorage(store.getState())
});

export default store;
