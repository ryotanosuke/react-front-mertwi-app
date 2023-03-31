import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { Header } from '../../components/common/layout/Header'
import { Menu } from '../../components/common/menu/Menu'
import { ChooseUser } from '../../components/massage/ChooseUser'
import { InterLocutors } from '../../components/massage/InterLocutors'

import { MessageRoom } from '../../components/massage/MessageRoom'
import { AuthContext } from '../../state/AuthContext'

type talkType = {
  contents: ''
}

const Message = () => {
  const [isSuperAction, setIsSuperAction] = useState()
  const [isRadioChecked, setIsRadioChecked] = useState(false)
  const [superTalkRoom, setSuperTalkRoom] = useState({} as talkType)
  const { user } = useContext(AuthContext)
  const [userId, setUserId] = useState()
  const router = useRouter()
  const talkingUserId = router.query.talkingUser
  const [interLocutorsUsers, setInterLocutorsUsers] = useState([])

  useEffect(() => {
    if (user) {
      setUserId(user._id)
    }
  }, [])

  return (
    <Header>
      <div className="mx-auto flex w-fit ">
        <Menu />
        <InterLocutors
          isSuperAction={isSuperAction}
          setIsSuperAction={setIsSuperAction}
          setSuperTalkRoom={setSuperTalkRoom}
          setIsRadioChecked={setIsRadioChecked}
          isRadioChecked={isRadioChecked}
          talkingUserId={talkingUserId}
          user={user}
          interLocutorsUsers={interLocutorsUsers}
          setInterLocutorsUsers={setInterLocutorsUsers}
        />
        {talkingUserId != userId && (
          <MessageRoom
            superTalkRoom={superTalkRoom}
            setSuperTalkRoom={setSuperTalkRoom}
            isSuperAction={isSuperAction}
            setIsSuperAction={setIsSuperAction}
            isRadioChecked={isRadioChecked}
          />
        )}

        {isRadioChecked && talkingUserId == userId ? (
          <MessageRoom
            superTalkRoom={superTalkRoom}
            setSuperTalkRoom={setSuperTalkRoom}
            isSuperAction={isSuperAction}
            setIsSuperAction={setIsSuperAction}
            isRadioChecked={isRadioChecked}
          />
        ) : (
          talkingUserId == userId && (
            <ChooseUser interLocutorsUsers={interLocutorsUsers} />
          )
        )}
      </div>
    </Header>
  )
}

export default Message
