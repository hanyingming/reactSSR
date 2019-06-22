import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import initialState from './state'
import reducer from './reducer'

export default createStore(reducer, initialState,
  composeWithDevTools(applyMiddleware(thunk)))
