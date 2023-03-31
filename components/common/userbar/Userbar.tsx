import { TextInput } from '@mantine/core'
import axios from 'axios'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { AuthContext } from '../../../state/AuthContext'
import { UserbarCards } from './UserbarCards'

export const Userbar = ({ isSuperAction, setIsSuperAction }: any) => {
  const { user } = useContext(AuthContext)
  const [users, setUsers] = useState([])

  useLayoutEffect(() => {
    if (user) {
      // 全ユーザー情報（ users.js NO.7 ）
      try {
        console.log('Userbar.js:登録者のリストを表示')
        const fetchUsers = async () => {
          await axios
            .get(
              `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/users/all/${user._id}`
            )
            .then((response) => {
              setUsers(response.data)
            })
        }
        fetchUsers()
      } catch (err) {
        console.log(err)
      }
    }
  }, [isSuperAction, user])

  return (
    <div className="userBarWidth hidden md:block">
      <div className="px-5 pt-12">
        <TextInput
          className="mb-12 rounded-2xl"
          placeholder="キーワード検索"
        ></TextInput>

        <div className="rounded-xlp-4 h-3/4 transform animate-fade-in-down ">
          <h3 className="p-3">登録ユーザー</h3>
          <ul className="m-0 list-none p-0">
            {users.map((otherUser) => (
              <li key={otherUser._id} className="m-0 p-0 ">
                <UserbarCards
                  otherUser={otherUser}
                  user={user}
                  setIsSuperAction={setIsSuperAction}
                  isSuperAction={isSuperAction}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
