import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import initialState from './state'
import reducer from './reducer';

export default createStore(reducer, initialState, applyMiddleware(thunk))
