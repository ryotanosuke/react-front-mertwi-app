import Head from 'next/head'
import { useState } from 'react'
import { Header } from '../../common/layout/Header'
import { Menu } from '../../common/menu/Menu'
import { Timeline } from '../../common/timeline/Timeline'
import { Userbar } from '../../common/userbar/Userbar'

export const DashBoard = () => {
  const [isSuperAction, setIsSuperAction] = useState()
  return (
    <Header>
      <div className="mx-auto flex w-fit ">
        <Menu />
        <Timeline
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
