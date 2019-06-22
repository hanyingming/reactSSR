const LOAIDNG_REDUCER = 'loadingAction'
const SUCCESS_REDUCER = 'successAction'
const ERROR_REDUCER = 'errorAction'

export default (state, action) => {
  console.warn('action', action)
  if (action.type === LOAIDNG_REDUCER) {
    return {
      ...state,
      getBlogList: {
        ...state.getBlogList,
        loading: true,
        loaded: false,
      },
    }
  } if (action.type === SUCCESS_REDUCER) {
    return {
      ...state,
      getBlogList: {
        ...state.getBlogList,
        loading: false,
        loaded: true,
        list: [{
          title: 'title',
        }],
      },
    }
  } if (action.type === ERROR_REDUCER) {
    console.warn(ERROR_REDUCER, state)
    return {
      ...state,
      getBlogList: {
        ...state.getBlogList,
        loading: false,
        loaded: true,
      },
    }
  }
  return state
}
