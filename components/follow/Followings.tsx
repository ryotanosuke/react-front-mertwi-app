import { Avatar, LoadingOverlay, ScrollArea } from '@mantine/core'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Tabs } from '@mantine/core'
import { ArrowBackUp } from 'tabler-icons-react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { FollowersUser } from './FollowersUser'
import { FollowingsUser } from './FollowingsUser'

export const Followings = ({
  isFollow,
  isSuperAction,
  setIsSuperAction,
}: any) => {
  const router = useRouter()
  const userId = router.query.userId
  const activNumber = isFollow == 'true' ? 0 : 1
  const [activeTab, setActiveTab] = useState(activNumber)
  const [visible, setVisible] = useState(false)
  const [followingsUser, setFollowingsUser] = useState([])
  const [followersUser, setFollowersUser] = useState([])
  const [isFollowing, setIsFollowing] = useState(false)
  const onChange = (active: number, tabKey: string) => {
    setActiveTab(active)
  }

  useLayoutEffect(() => {
    setVisible((v) => !v)
    if (userId) {
      try {
        const fetchUser = async () => {
          await axios
            .get(
              // users.js（ No.8 ）
              `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/users/followings/${userId}`
            )
            .then((response) => {
              setFollowingsUser(response.data)
            })
          await axios
            .get(
              // users.js（ No.9 ）
              `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/users/followers/${userId}`
            )
            .then((response) => {
              setFollowersUser(response.data)
            })
        }
        fetchUser()
      } catch (err) {
        console.log(err)
      }
    }
    setVisible((v) => !v)
  }, [isSuperAction])

  return (
    <div className="basis-6/12 transform animate-fade-in-down">
      <div className="border-3 mr-14  mt-0 border-l-0 border-solid border-gray-300 pt-0 ">
        <ScrollArea
          type="scroll"
          scrollbarSize={4}
          scrollHideDelay={3000}
          className="h-screen"
        >
          <div className=" transform animate-fade-in-down border-4 border-x-0 border-y-0 border-solid border-gray-300 p-12">
            <ArrowBackUp
              className="hover:cursor-pointer hover:text-gray-500"
              onClick={() => {
                router.back()
              }}
            />
          </div>
          <Tabs
            grow
            position="center"
            active={activeTab}
            onTabChange={onChange}
          >
            <Tabs.Tab label="フォロー">
              <LoadingOverlay visible={visible} transitionDuration={500} />
              <ul className=" list-none">
                {followingsUser &&
                  followingsUser.map((followingUser, key) => (
                    <FollowingsUser
                      followingUser={followingUser}
                      setIsSuperAction={setIsSuperAction}
                      isSuperAction={isSuperAction}
                      key={key}
                    />
                  ))}
              </ul>
            </Tabs.Tab>
            <Tabs.Tab label="フォロワー">
              <LoadingOverlay visible={visible} transitionDuration={500} />
              <ul className=" list-none">
                {followersUser &&
                  followersUser.map((followerUser, key) => (
                    <FollowersUser
                      followerUser={followerUser}
                      setIsSuperAction={setIsSuperAction}
                      isSuperAction={isSuperAction}
                      key={key}
                    />
                  ))}
              </ul>
            </Tabs.Tab>
          </Tabs>
        </ScrollArea>
      </div>{' '}
    </div>
  )
}
