import { Avatar, Button } from '@mantine/core'
import axios from 'axios'
import Link from 'next/link'
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { AuthContext } from '../../state/AuthContext'

export const FollowersUser = ({
  followerUser,
  isSuperAction,
  setIsSuperAction,
}: any) => {
  const [isFollowing, setIsFollowing] = useState(false)
  const [isSelf, setIsSelf] = useState(false)
  const { user } = useContext(AuthContext)
  const followRef = useRef<HTMLElement>()

  useLayoutEffect(() => {
    if (followerUser.followers) {
      setIsFollowing(followerUser.followers.includes(user._id))
    }
    if (user._id == followerUser._id) {
      setIsSelf(true)
    } else {
      setIsSelf(false)
    }
  }, [followerUser])

  const handleClick = async () => {
    if (!isFollowing) {
      try {
        //users.js（ No.5 ）
        await axios.put(
          `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/users/${followerUser._id}/follow`,
          user
        )
      } catch (err) {
        console.log(err)
      }
    } else {
      try {
        //users.js（ No.5 ）
        await axios.put(
          `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/users/${followerUser._id}/unfollow`,
          user
        )
      } catch (err) {
        console.log(err)
      }
    }
    setIsSuperAction(!isSuperAction)
  }

  const mouseOver = () => {
    if (followRef.current.innerHTML == 'フォロー中') {
      followRef.current.innerHTML = '解除する'
    }
  }

  const mouseLeave = () => {
    if (followRef.current.innerHTML == '解除する') {
      followRef.current.innerHTML = 'フォロー中'
    }
  }

  return (
    <li className="m-0 flex items-center justify-start py-4">
      <Link href={`/profile/${followerUser._id}`}>
        <a className="flex items-center text-inherit no-underline hover:underline">
          <div className="m-0 flex w-32 items-center p-0">
            <Avatar />
            <p className="ml-2">{followerUser.userName}</p>
          </div>
        </a>
      </Link>
      {!isSelf &&
        (isFollowing ? (
          <Button
            className="
              mx-4 w-28
            border-gray-500
              hover:border-none 
            hover:bg-zinc-700 
              hover:font-bold"
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
        ))}
    </li>
  )
}
