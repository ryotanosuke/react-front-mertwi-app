// 1 userReducerに代入して処理内容をセットする
// 2 dispatch()の引数がactionに渡る
const AuthReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        user: null,
        isFetching: true,
        error: false,
      }
    case 'LOGIN_SUCCESS':
      return {
        // payload が新しいステート情報になる
        // action.payloadはuserのオブジェクトが入る
        user: action.payload,
        isFetching: false,
        error: false,
      }
    case 'LOGIN_ERROR':
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export default AuthReducer
