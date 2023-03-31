import { ScrollArea } from '@mantine/core'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../state/AuthContext'
import { ExhibitCard } from './ExhibitCard'
import { Tabs } from '@mantine/core'
import { PurshasedCard } from './PurchasedCard'
import { CompleteCard } from './CompleteCard'

export const ExhibitCards = () => {
  const [isAction, setIsAction] = useState(false)
  const [exhibits, setExhibits] = useState([])
  const { user } = useContext(AuthContext)
  const [activeTab, setActiveTab] = useState(0)
  const onChange = (active: number, tabKey: string) => {
    setActiveTab(active)
  }

  useEffect(() => {
    if (user) {
      // 出品のフェッチ（ goods.js NO.2 ）
      const fetchPosts = async () => {
        // レスポンスデータ
        console.log('ExhibitCards.js:出品者の情報を取得')

        const response = await axios.get(
          //（ goods.js NO.2 ）
          `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/goods/seller/${user._id}`
        )
        setExhibits(
          // dataであることに注意
          response.data.sort((post1: any, post2: any) => {
            return (
              Number(new Date(post2.createdAt)) -
              Number(new Date(post1.createdAt))
            )
          })
        )
      }
      fetchPosts()
    }
  }, [user])

  return (
    <div className="mideumExhibitWidth lg:exhibitWidth m-0 p-12">
      <div className="">
        <h2 className="pb-5">出品した商品</h2>
      </div>
      <ScrollArea
        type="scroll"
        scrollbarSize={4}
        scrollHideDelay={3000}
        style={{
          height: 'calc(100vh - 280px)',
        }}
      >
        <Tabs active={activeTab} onTabChange={onChange} tabPadding="xl">
          <Tabs.Tab label={<p className="px-9"> 出品商品</p>} tabKey="First">
            <ul className="m-0 list-none p-0">
              {exhibits.map((exhibit, key) => (
                <li className="" key={key}>
                  <ExhibitCard exhibit={exhibit} />
                </li>
              ))}
            </ul>
          </Tabs.Tab>
          <Tabs.Tab label={<p className="px-9"> 購入済み</p>} tabKey="Second">
            <ul className="m-0 list-none p-0">
              {exhibits.map((exhibit, key) => (
                <li className="" key={key}>
                  <PurshasedCard exhibit={exhibit} />
                </li>
              ))}
            </ul>
          </Tabs.Tab>
          <Tabs.Tab label={<p className="px-9"> 完了済み</p>} tabKey="Third">
            <ul className="m-0 list-none p-0">
              {exhibits.map((exhibit, key) => (
                <li className="" key={key}>
                  <CompleteCard exhibit={exhibit} />
                </li>
              ))}
            </ul>
          </Tabs.Tab>
        </Tabs>
      </ScrollArea>
    </div>
  )
}
