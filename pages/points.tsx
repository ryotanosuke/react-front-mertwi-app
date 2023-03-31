import React, { useState } from 'react'
import { Header } from '../components/common/layout/Header'
import { Menu } from '../components/common/menu/Menu'
import { PurchasePoint } from '../components/points/PurchasePoint'

const points = () => {
  const [isSuperAction, setSuperIsAction] = useState(false)
  return (
    <Header>
      <div className="mx-auto flex w-fit ">
        <Menu />
        <PurchasePoint
          isSuperAction={isSuperAction}
          setSuperIsAction={setSuperIsAction}
        />
      </div>
    </Header>
  )
}

export default points
