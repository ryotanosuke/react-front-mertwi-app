import { initScriptLoader } from 'next/script'
import { createContext, useEffect, useReducer, useState } from 'react'
import AuthReducer from './AuthReducer'

interface ContextType {
  user: any
  isFetching: boolean
  dispatch: any
}

export const AuthContext = createContext({} as ContextType)

export const AuthContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(AuthReducer, {})

  useEffect(() => {
    const storageUser = localStorage.getItem('user')
    const initialUser =
      storageUser !== null || undefined
        ? JSON.parse(localStorage.getItem('user') || '')
        : null

    const initialState = {
      user: initialUser || null,
      isFetching: false,
      error: false,
    }

    dispatch({ type: 'LOGIN_SUCCESS', payload: initialState.user })
  }, [])

  useEffect(() => {
    // dispatchが呼ばれ次第で更新 + ストーレージ = Json形式
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user))
    }
  }, [state.user])

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        // dispatchはlogin.js ( actionCall.js )で呼ばれる
        // dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// user: {
//   _id: '63019b460deb7acd04366205',
//   username: 'aota',
//   email: 'yoa@yahoo.co.jp',
//   password: '111111',
//   profilePicture: '/person/1.jpeg',
//   coverPicture: '',
//   followers: [],
//   followings: [],
//   isAdmin: false,
// },
