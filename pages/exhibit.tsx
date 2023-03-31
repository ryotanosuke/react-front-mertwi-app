import React, { useEffect, useState } from 'react'
import { ExhibitCards } from '../components/exhibit/ExhibitCards'
import { Menu } from '../components/common/menu/Menu'
import { Header } from '../components/common/layout/Header'

const exhibit = () => {
  return (
    <Header>
      <div className="mx-auto flex w-fit ">
        <Menu />
        <ExhibitCards />
      </div>
    </Header>
  )
}

export default exhibit
