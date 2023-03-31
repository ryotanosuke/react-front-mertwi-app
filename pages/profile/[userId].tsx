import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Header } from '../../components/common/layout/Header'
import { Menu } from '../../components/common/menu/Menu'
import { Userbar } from '../../components/common/userbar/Userbar'
import { ProfileTimeline } from '../../components/profile/ProfileTimeline'

const Profile = () => {
  const [isSuperAction, setIsSuperAction] = useState()

  return (
    <Header>
      <div className="mx-auto flex w-fit ">
        <Menu />
        <ProfileTimeline
          isSuperAction={isSuperAction}
          setIsSuperAction={setIsSuperAction}
        />
        <Userbar
          isSuperAction={isSuperAction}
          setIsSuperAction={setIsSuperAction}
        />
      </div>
    </Header>
  )
}

export default Profile

//userRouter以外のクエリ取得方法（ コードマフィア：184. ）
// export async function getServerSideProps({ query }) {
//   return {
//     props: query,
//   }
// }
