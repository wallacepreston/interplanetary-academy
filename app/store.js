import {createStore, applyMiddleware} from 'redux'
import axios from 'axios'
import rootReducer from './reducers'
import loggingMiddleware from 'redux-logger' // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk' // https://github.com/gaearon/redux-thunk

// // ORIGINAL CODE TO EXPORT THE STORE
// export default createStore(
//   rootReducer,
//   applyMiddleware(
//     // `withExtraArgument` gives us access to axios in our async action creators!
//     // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
//     thunkMiddleware.withExtraArgument({axios}),
//     loggingMiddleware
//   )
// )

// WITH ADVANCED REDUX DEV TOOLS
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer, /* preloadedState, */ 
  composeEnhancers(
    applyMiddleware(thunkMiddleware.withExtraArgument({axios}),
    loggingMiddleware)
  ));

export default store
