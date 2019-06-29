const LOAIDNG_ACTION = 'loadingAction'
const SUCCESS_ACTION = 'successAction'
const ERROR_ACTION = 'errorAction'

const loadingAction = () => ({
  type: LOAIDNG_ACTION,
})

const successAction = value => ({
  type: SUCCESS_ACTION,
  value,
})

const errorAction = () => ({
  type: ERROR_ACTION,
})

// 延迟执行
export const delay = () => new Promise(resolve => setTimeout(() => {
  resolve({
    code: 200,
    data: {
      counter: 123,
    },
    message: '请求异常',
  })
}, 2000))

export const fetchData = async (dispatch) => {
  console.warn('loadding')
  dispatch(loadingAction());
  return delay().then((res) => {
    console.warn('res:', res)
    return dispatch(successAction(res.data));
  }).catch((err) => {
    console.warn('err:', err)
    return dispatch(errorAction());
  });
}
