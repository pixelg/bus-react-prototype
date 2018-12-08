import React from "react";
import ReactDOM from "react-dom";
// import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Router, Route, browserHistory } from "react-router";
import { createBrowserHistory } from "history";
import { syncHistoryWithStore } from "react-router-redux";
import App from "./App.js";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import searchReducer from "./book-redux/reducers/searchReducer";
import { routerReducer } from "react-router-redux";

// import Article from "./components/Article";

//import index from "./book-redux/index";

// ReactDOM.render(
//     <Provider store={store}>
//         <Article />
//     </Provider>,
//     document.getElementById("article")
// );

// ReactDOM.render((
//     <BrowserRouter basename="booking">
//         <App />
//     </BrowserRouter>),
//     document.getElementById("booking_form")
// );

const store = createStore(
  combineReducers({
    searchReducer,
    routing: routerReducer
  }),
  applyMiddleware(thunk)
);

const history = syncHistoryWithStore(createBrowserHistory(), store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App} />
        </Router>
    </Provider>,
    document.getElementById("booking_form")
);