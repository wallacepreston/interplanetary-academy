import {createStore, applyMiddleware} from 'redux'
import axios from 'axios'
import rootReducer from './reducers'
import loggingMiddleware from 'redux-logger' // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk' // https://github.com/gaearon/redux-thunk

// WITH ADVANCED REDUX DEV TOOLS
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer, /* preloadedState, */ 
  composeEnhancers(
    applyMiddleware(thunkMiddleware.withExtraArgument({axios}),
    loggingMiddleware)
  )
  )

export default store
