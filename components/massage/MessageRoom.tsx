import { Button, ScrollArea, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

import axios from 'axios'
import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../../state/AuthContext'
import { OneMessage } from './OneMessage'

export const MessageRoom = ({
  superTalkRoom,
  setSuperTalkRoom,
  isSuperAction,
  setIsSuperAction,
}: any) => {
  const form = useForm({
    initialValues: {
      userId: '',
      desc: '',
      img: '',
      time: '',
    },
  })

  const { user } = useContext(AuthContext)
  const viewport = useRef<HTMLDivElement>()

  useEffect(() => {
    viewport.current.scrollTo({
      top: viewport.current.scrollHeight,
      behavior: 'smooth',
    })
  })

  // メッセージ更新
  const handleSubmit = (e: any) => {
    // e.preventDefault()
    const newRoom = {
      userId: user._id,
      desc: form.values.desc,
      time: superTalkRoom.createdAt,
    }

    if (superTalkRoom) {
      const updateRoom = async () => {
        try {
          await axios.put(
            // messages.js（ No.3 ）
            `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/messages/addition/${superTalkRoom._id}`,
            newRoom
          )

          await axios
            .get(
              // messages.js（ No.2 ）
              `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/messages/get/${superTalkRoom._id}`
            )
            .then((response) => {
              setSuperTalkRoom(response.data)
            })
        } catch (err) {
          console.log(err)
        }
      }
      updateRoom()
      form.reset()
      setIsSuperAction(!isSuperAction)
    }
  }

  return (
    <div className="  chooseUserWidth  border border-y-0  border-l-0 border-solid border-gray-300">
      <ScrollArea
        viewportRef={viewport}
        type="always"
        scrollbarSize={4}
        style={{
          height: 'calc(100vh -  400px)',
        }}
      >
        <div className="p-12">
          {superTalkRoom.contents &&
            superTalkRoom.contents.map((content: [], key: string) => (
              <ul className="list-none" key={key}>
                <OneMessage content={content} />
              </ul>
            ))}
        </div>
      </ScrollArea>
      <form onSubmit={form.onSubmit((e) => handleSubmit(e))}>
        <div className="py-14 px-12">
          <TextInput
            className="py-12"
            placeholder="メッセージを作成する"
            required
            {...form.getInputProps('desc')}
          />
          <Button
            onClick={handleSubmit}
            className="mx-3"
            color="violet"
            radius="xl"
            size="md"
          >
            送信
          </Button>
        </div>
      </form>
    </div>
  )
}
