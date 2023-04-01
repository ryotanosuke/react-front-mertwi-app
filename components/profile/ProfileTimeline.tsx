import React, { useContext, useLayoutEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Button, Modal, ScrollArea } from '@mantine/core'
import { Posts } from '../common/posts/Posts'
import { AuthContext } from '../../state/AuthContext'
import { MailForward, Photo } from 'tabler-icons-react'
import Link from 'next/link'

export const ProfileTimeline = ({ isSuperAction, setIsSuperAction }: any) => {
  const { user } = useContext(AuthContext)
  const router = useRouter()
  const userId = router.query.userId
  const isLoginUser = user && user._id == userId
  const [isAction, setIsAction] = useState(false)
  const [profilePosts, setProfilePosts] = useState([])
  const [profileUser, setProfileUser] = useState({
    userName: '',
    followers: [],
    _id: '',
    talkers: [],
    profilePicture: '',
  })
  const [isFollowing, setIsFollowing] = useState(false)
  const [followers, setFollowers] = useState(0)
  const [followings, setFollowings] = useState(0)
  const [isFollowHover, setIsFollowHover] = useState(false)
  const followRef = useRef<HTMLElement>()
  const [opened, setOpened] = useState(false)
  const [file, setFile] = useState(null)

  useLayoutEffect(() => {
    console.log(
      'ProfileTimeline.js:プロフィールタイムラインのフェッチ(初期動作)'
    )
    if (userId) {
      const fetchPosts = async () => {
        try {
          await axios
            .get(
              // 最新のuser情報をフェッチ（ ログインユーザーを含む ）
              `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/users/${userId}`
            )
            .then((response) => {
              setProfileUser(response.data)
              setFollowings(response.data.followings.length)
              setFollowers(response.data.followers.length)
            })

          await axios
            .get(
              // 投稿と出品のフェッチ（ posts.js NO.6 ）
              `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/posts/profile/${
                // isLoginUser ? user._id : userId
                userId
              }`
            )
            .then((response) => {
              setProfilePosts(
                response.data.sort((post1: any, post2: any) => {
                  return (
                    Number(new Date(post2.createdAt)) -
                    Number(new Date(post1.createdAt))
                  )
                })
              )
            })
        } catch (err) {
          console.log(err)
        }
      }
      fetchPosts()
    }
  }, [isSuperAction, userId, isAction])

  useLayoutEffect(() => {
    if (!isLoginUser && user) {
      setIsFollowing(profileUser.followers.includes(user._id))
    }
  }, [profileUser, isSuperAction])

  const handleClick = async () => {
    if (!isFollowing) {
      try {
        //users.js（ No.5 ）
        await axios.put(
          `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/users/${profileUser._id}/follow`,
          user
        )
      } catch (err) {
        console.log(err)
      }
    } else {
      try {
        //users.js（ No.5 ）
        await axios.put(
          `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/users/${profileUser._id}/unfollow`,
          user
        )
      } catch (err) {
        console.log(err)
      }
    }
    setIsFollowHover(false)
    setIsSuperAction(!isSuperAction)
  }

  // トークルーム作成
  const messageHandle = async () => {
    const target = {
      userId: user._id,
    }

    //配列オブジェクトが含むか確認（ 既にメッセしているか? ）
    const some = profileUser.talkers.some(
      (talker) => talker.userId === target.userId
    )

    if (!some) {
      try {
        const eachOtherId = {
          talkercUser: user._id,
          talkedUser: profileUser._id,
        }
        await axios.post(
          `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/messages/`,
          eachOtherId
        )
      } catch (err) {
        console.log(err)
      }
    }
    router.push(`/message/${userId}`)
  }

  const mouseOver = () => {
    if (followRef.current.innerHTML == 'フォロー中') {
      setIsFollowHover(true)
      followRef.current.innerHTML = '解除する'
    }
  }

  const mouseLeave = () => {
    if (followRef.current.innerHTML == '解除する') {
      setIsFollowHover(false)
      followRef.current.innerHTML = 'フォロー中'
    }
  }

  const handleFirstClick = async () => {
    console.log('アップロード')

    const newImg = {
      profilePicture: '',
    }

    if (file) {
      const data = new FormData()
      const fileName = Date.now() + file.name
      data.append('name', fileName)
      data.append('file', file)
      newImg.profilePicture = fileName
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/upload`,
          data
        )
      } catch (err) {
        console.log(err)
      }
    }

    console.log('yu-za-touroku')

    try {
      // posts.js（ No.1 ）
      await axios.put(
        `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/users/${user._id}`,
        newImg
      )

      setFile(null)
      setIsAction(!isAction)
    } catch (err) {
      console.log(err)
    }

    setOpened(false)
  }

  const onFileChange = (e: any) => {
    setFile(e.target.files[0])
  }

  return (
    <div className="timlineWidth">
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="プロフィール画像を変更する"
        className="p-78"
      >
        <label htmlFor="file" className="shareOption hover:cursor-pointer">
          <div className="flex pb-6 hover:underline">
            <Photo />
            <span className="pl-3 ">写真を付属</span>
            {file && <span className="pl-4">{`  :  1件追加  `}</span>}
          </div>
          <input
            style={{ display: 'none' }}
            type="file"
            id="file"
            accept=".png, .jpeg, .jpg"
            onChange={(e) => onFileChange(e)}
            name="file"
          />
        </label>

        <div>
          <Button onClick={handleFirstClick}>アップロードを適用</Button>
        </div>
      </Modal>
      <div className="mr-14 mt-0 w-full  border-2  border-b-0 border-l-0 border-solid border-gray-300 pt-0 shadow-sm  shadow-gray-300">
        <ScrollArea
          type="scroll"
          scrollbarSize={4}
          scrollHideDelay={3000}
          style={{
            height: 'calc(100vh - 64px)',
          }}
          className=" w-full  "
        >
          <div className="bg-white pb-1 shadow">
            <img
              src={process.env.NEXT_PUBLIC_FOLDER + 'post/neko.jpg'}
              alt=""
              className="h-80 w-full object-cover"
            />
            <div className="pt-22 relative p-12">
              <div className="absolute -top-20 flex flex-col items-center">
                <img
                  className="h-40 w-40 rounded-full border-4 border-solid border-white "
                  src={
                    profileUser.profilePicture
                      ? process.env.NEXT_PUBLIC_FOLDER +
                        profileUser.profilePicture
                      : process.env.NEXT_PUBLIC_FOLDER + 'person/noIcon.png'
                  }
                  alt=""
                />
                <h2 className="text-gray-700">
                  {profileUser && profileUser.userName}
                </h2>
              </div>
              <div>
                {!isLoginUser ? (
                  <div className="flex justify-end py-4">
                    <div
                      className="flex items-center
                   hover:cursor-pointer
                    hover:underline
                    "
                      onClick={messageHandle}
                    >
                      <MailForward />
                      <p className="m-0 py-0 pl-3 font-semibold">
                        メッセージを送る
                      </p>
                    </div>

                    <Button
                      className={
                        'border-none ' +
                        'ml-5 ' +
                        'w-28 ' +
                        'className="transform animate-fade-in-down ' +
                        (isFollowing && 'border-gray-500 ') +
                        // (isFollowHover && 'hover:text-fuchsia-800 ') +
                        (isFollowHover && 'hover:border-none ') +
                        (isFollowHover && 'hover:font-bold ') +
                        (isFollowHover && 'hover:bg-zinc-700 ')
                      }
                      color={isFollowing ? 'gray' : 'cyan'}
                      radius="xl"
                      size="xs"
                      onClick={handleClick}
                      onMouseOver={mouseOver}
                      onMouseLeave={mouseLeave}
                    >
                      <span className="" ref={followRef}>
                        {isFollowing ? 'フォロー中' : 'フォローする'}
                      </span>
                    </Button>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <Button
                      className="my-4 px-8"
                      color="gray"
                      size="xs"
                      onClick={() => setOpened(true)}
                    >
                      編集する
                    </Button>
                  </div>
                )}
                <div className="pt-12">
                  <div className="py-3">
                    <Link
                      href={{
                        pathname: `/follow/${profileUser && profileUser._id}`,
                        query: { isFollowing: true },
                      }}
                    >
                      <span className="font-bold text-gray-700 hover:cursor-pointer hover:underline">{`フォロー ${followings}人`}</span>
                    </Link>
                  </div>
                  <div>
                    <Link
                      href={{
                        pathname: `/follow/${profileUser && profileUser._id}`,
                        query: { isFollowing: false },
                      }}
                    >
                      <span className="font-bold text-gray-700 hover:cursor-pointer hover:underline">{`フォロワー ${followers}人`}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <ul className="m-0 list-none p-0">
              {profilePosts.map((post, key) => (
                <li
                  key={key}
                  className="m-12 rounded-3xl bg-white p-12 shadow-sm  shadow-gray-300"
                >
                  <Posts
                    post={post}
                    isAction={isAction}
                    setIsAction={setIsAction}
                    isSuperAction={isSuperAction}
                  />
                </li>
              ))}
            </ul>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
