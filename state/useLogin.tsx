import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from './AuthContext'

// login.jsから呼び出される
export const useLogin = async (currentUser: any, dispatch: any) => {
  dispatch({ type: 'LOGIN_START' })

  try {
    // No.2(auth)に接続
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/auth/login/`,
      currentUser
    )

    // user情報をステートに保存する
    // ↓ actionに格納される
    // action.type , action.payload で使用される
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data })
  } catch (err) {
    dispatch({ type: 'LOGIN_ERROR', payload: err })
  }
}
