import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import initialState from './state'
import reducer from './reducer'

const defaultState = (global && global.context && global.context.INITIAL_STATE)
  || initialState

export default createStore(reducer, defaultState,
  composeWithDevTools(applyMiddleware(thunk)))
