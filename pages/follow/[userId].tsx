import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Menu } from '../../components/common/menu/Menu'
import { Userbar } from '../../components/common/userbar/Userbar'
import { Followings } from '../../components/follow/Followings'

const useFollow = () => {
  const router = useRouter()
  const userId = router.query.userId
  const isFollow = router.query.isFollowing
  const [isSuperAction, setIsSuperAction] = useState()

  return (
    <div className="" style={{ margin: '0 auto ', width: '80%' }}>
      <div
        className="flex justify-center"
        style={{
          width: '1350px',
          margin: '0 auto ',
        }}
      >
        <Menu />
        <Followings
          isFollow={isFollow}
          isSuperAction={isSuperAction}
          setIsSuperAction={setIsSuperAction}
        />
        <Userbar
          isSuperAction={isSuperAction}
          setIsSuperAction={setIsSuperAction}
        />
      </div>
    </div>
  )
}

export default useFollow
