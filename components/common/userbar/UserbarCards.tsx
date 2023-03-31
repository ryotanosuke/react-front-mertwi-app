import { Avatar, Button } from '@mantine/core'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

export const UserbarCards = ({
  otherUser,
  user,
  isSuperAction,
  setIsSuperAction,
}: any) => {
  const [isFollowing, setIsFollowing] = useState(false)
  const followRef = useRef<HTMLElement>()

  useEffect(() => {
    if (otherUser.followers) {
      setIsFollowing(otherUser.followers.includes(user._id))
    }
  }, [otherUser])

  const handleClick = async () => {
    if (!isFollowing) {
      try {
        //users.js（ No.5 ）
        await axios.put(
          `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/users/${otherUser._id}/follow`,
          user
        )
      } catch (err) {
        console.log(err)
      }
    } else {
      try {
        //users.js（ No.5 ）
        await axios.put(
          `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/users/${otherUser._id}/unfollow`,
          user
        )
      } catch (err) {
        console.log(err)
      }
    }
    setIsSuperAction(!isSuperAction)
  }

  const mouseOver = () => {
    if (followRef.current.innerText == 'フォロー中') {
      followRef.current.innerText = '解除する'
    }
  }

  const mouseLeave = () => {
    if (followRef.current.innerText == '解除する') {
      followRef.current.innerText = 'フォロー中'
    }
  }

  return (
    <div className="m-0 flex items-center justify-center p-0">
      <Link href={`/profile/${otherUser._id}`}>
        <a className="flex items-center text-inherit no-underline hover:underline">
          <div className="m-0 flex w-32 items-center p-0">
            <Avatar />
            <p className="ml-2">{otherUser.userName}</p>
          </div>
        </a>
      </Link>

      {isFollowing ? (
        <Button
          className="
            mx-4 w-28
          border-gray-500
            hover:border-none
          hover:bg-zinc-600
            hover:font-bold
          "
          color="gray"
          radius="xl"
          size="xs"
          onClick={handleClick}
          onMouseOver={mouseOver}
          onMouseLeave={mouseLeave}
        >
          <span ref={followRef}>フォロー中</span>
        </Button>
      ) : (
        <Button
          className="mx-4 w-28"
          color="cyan"
          radius="xl"
          size="xs"
          onClick={handleClick}
        >
          フォローする
        </Button>
      )}
    </div>
  )
}
