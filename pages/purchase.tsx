import React from 'react'
import { Header } from '../components/common/layout/Header'
import { Menu } from '../components/common/menu/Menu'
import { PurchaseCards } from '../components/purchase/PurchaseCards'

const purchase = () => {
  return (
    <Header>
      <div className="mx-auto flex w-fit ">
        <Menu />
        <PurchaseCards />
      </div>
    </Header>
  )
}

export default purchase
