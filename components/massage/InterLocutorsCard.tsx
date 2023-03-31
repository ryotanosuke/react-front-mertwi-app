import { Avatar, Menu } from '@mantine/core'
import axios from 'axios'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { Settings } from 'tabler-icons-react'

export const InterLocutorsCard = ({
  // クエリーから渡されたuserId(DM相手)
  talkingUserId,
  // DM相手
  interLocutorUser,
  loginUser,
  isSuperAction,
  setIsSuperAction,
  setSuperTalkRoom,
  setIsRadioChecked,
}: any) => {
  const [lengthNum, setLengthNum] = useState(0)
  const [isAction, setIsAction] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useLayoutEffect(() => {
    let num: number
    for (let i = 0; i < interLocutorUser.talkers.length; i++) {
      if (interLocutorUser.talkers[i].userId == loginUser._id) {
        num = i
      }
    }

    if (inputRef.current.checked) {
      const fetchMessageRoom = async () => {
        try {
          await axios
            // No.2(messages) と通信
            .get(
              `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/messages/get/${interLocutorUser.talkers[num].messageId}`
            )
            .then((res) => {
              if (res.data) {
                setSuperTalkRoom(res.data)
              } else {
                setSuperTalkRoom({ contents: '' })
                setIsRadioChecked(false)
              }
            })
        } catch (err) {
          console.log(err)
        }
      }

      setIsSuperAction(!isSuperAction)
      fetchMessageRoom()
    }

    setLengthNum(num)
  }, [talkingUserId, interLocutorUser._id, isAction])

  const deleteTalkRoom = async () => {
    // 配列オブジェクトのインデックス
    try {
      let num: number
      for (let i = 0; i < interLocutorUser.talkers.length; i++) {
        if (interLocutorUser.talkers[i].userId == loginUser._id) {
          num = i
        }
      }

      await axios
        // No.4(messages) と通信
        .delete(
          `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/messages/delete/${interLocutorUser.talkers[num].messageId}`,

          {
            // dataの名前でないとNG
            // 便宜上、ログイン者のUserIDではなく投稿者のUserIDを送信(他人の投稿も削除可能)
            data: {
              talkerUserId: loginUser._id,
              talkedUserId: interLocutorUser._id,
            },
          }
        )
        .then((res) => {
          // リロードしなくても投稿を反映させる
          setIsSuperAction(!isSuperAction)
          setIsAction(!isAction)
        })
    } catch (err) {
      console.log(err)
    }
  }

  const hadleChange = (e: any) => {
    if (e.target.checked) {
      const fetchMassageRoom = async () => {
        try {
          await axios
            // No.2(messages) と通信
            .get(
              `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/messages/get/${interLocutorUser.talkers[lengthNum].messageId}`
            )
            .then((res) => {
              setSuperTalkRoom(res.data)
            })
        } catch (err) {
          console.log(err)
        }
      }
      fetchMassageRoom()
    } else {
      setIsSuperAction({})
    }
    setIsRadioChecked(inputRef.current.checked)
  }

  return (
    <div>
      <input
        id={interLocutorUser.talkers[lengthNum].messageId}
        value={interLocutorUser.talkers[lengthNum].messageId}
        type="radio"
        name="tab_item"
        className="peer hidden"
        defaultChecked={interLocutorUser._id == talkingUserId && true}
        ref={inputRef}
        onChange={(e) => hadleChange(e)}
      />
      <label
        className="
        w-210   
        block 
        hover:bg-gray-400
        peer-checked:bg-gray-300
        "
        htmlFor={interLocutorUser.talkers[lengthNum].messageId}
      >
        <li className=" border-x-0 border-t-0 border-solid border-gray-300 p-4 py-6 ">
          <div className="m-0 flex justify-between  p-0">
            <div className="flex items-center">
              <Avatar />
              <h4 className="m-0 ml-4 text-gray-700">
                {interLocutorUser.userName}
              </h4>
            </div>

            <span>
              <Menu trigger="click" placement="end" withArrow>
                <Menu.Label>編集</Menu.Label>
                <Menu.Item
                  onClick={deleteTalkRoom}
                  icon={<Settings size={16} />}
                >
                  削除
                </Menu.Item>
              </Menu>
            </span>
          </div>
        </li>
      </label>
    </div>
  )
}
