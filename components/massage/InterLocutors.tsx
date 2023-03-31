import { ScrollArea } from '@mantine/core'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { AuthContext } from '../../state/AuthContext'
import { InterLocutorsCard } from './InterLocutorsCard'

export const InterLocutors = ({
  isSuperAction,
  setIsSuperAction,
  setSuperTalkRoom,
  setIsRadioChecked,
  isRadioChecked,
  talkingUserId,
  interLocutorsUsers,
  setInterLocutorsUsers,
}: any) => {
  const { user } = useContext(AuthContext)

  useLayoutEffect(() => {
    if (user) {
      const fetchTakingUser = async () => {
        try {
          // 最新のuser情報をフェッチ（ ログインユーザーを含む ）
          await axios
            .get(
              `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/messages/getTalkers/${user._id}`
            )
            .then((response) => {
              setInterLocutorsUsers(
                response.data.sort((user1: any, user2: any) => {
                  return (
                    Number(new Date(user2.updatedAt)) -
                    Number(new Date(user1.updatedAt))
                  )
                })
              )
            })
        } catch (err) {
          console.log(err)
        }
      }
      fetchTakingUser()
    }
  }, [isSuperAction, talkingUserId])

  return (
    <div className="interLocutorsWidth">
      <div className="border-3  mt-0 border-l-0 border-solid border-gray-300">
        <ScrollArea
          type="scroll"
          scrollbarSize={4}
          scrollHideDelay={3000}
          style={{
            height: 'calc(100vh - 64px)',
          }}
        >
          <ul className="m-0 list-none p-0 ">
            {interLocutorsUsers.map((interLocutorUser: {}, key: '') => (
              <InterLocutorsCard
                key={key}
                interLocutorUser={interLocutorUser}
                talkingUserId={talkingUserId}
                loginUser={user}
                isSuperAction={isSuperAction}
                setIsSuperAction={setIsSuperAction}
                setSuperTalkRoom={setSuperTalkRoom}
                setIsRadioChecked={setIsRadioChecked}
                isRadioChecked={isRadioChecked}
              />
            ))}
          </ul>
        </ScrollArea>
      </div>
    </div>
  )
}
