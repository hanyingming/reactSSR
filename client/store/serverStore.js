const thunk = require('redux-thunk')
const { createStore, applyMiddleware } = require('redux')
const { composeWithDevTools } = require('redux-devtools-extension')
const initialState = require('./state')
const reducer = require('./reducer')

module.exports = createStore(reducer, initialState,
  composeWithDevTools(applyMiddleware(thunk)))
