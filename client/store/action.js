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
    data: {},
    message: '请求异常',
  })
}, 10000))

export function getData(dispatch, getState) {
  // const state = getState();
  console.warn('state:', getState)
  dispatch(loadingAction);
  delay().then((res) => {
    console.warn('res:', res)
    dispatch(successAction);
  }).catch((err) => {
    console.warn('err:', err)
    dispatch(errorAction);
  });
}
