import { createStore, combineReducers } from "redux";
import rootReducer from "../reducers/searchReducer";
import { routerReducer } from "react-router-redux";

const store = createStore(
  combineReducers({
    rootReducer,
    routing: routerReducer
  })
);

export default store;