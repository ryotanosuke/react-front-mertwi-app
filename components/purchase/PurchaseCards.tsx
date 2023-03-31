import { ScrollArea, Tabs } from '@mantine/core'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../state/AuthContext'
import { CompleteCard } from './CompleteCard'
import { PurchaseCard } from './PurchaseCard'

export const PurchaseCards = () => {
  const [isAction, setIsAction] = useState(false)
  const [purchase, setPurchase] = useState([])
  const { user } = useContext(AuthContext)
  const [activeTab, setActiveTab] = useState(0)
  const onChange = (active: number, tabKey: string) => {
    setActiveTab(active)
  }

  useEffect(() => {
    if (user) {
      // 出品のフェッチ（ goods.js NO.2 ）
      const fetchPurchase = async () => {
        // レスポンスデータ
        console.log('PurchaseCards.js:購入者のグッズ情報を取得')
        try {
          const response = await axios.get(
            //goods.js（ No.3 ）
            `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/goods/buyer/${user._id}`,
            user
          )
          setPurchase(
            response.data.sort((post1: any, post2: any) => {
              return (
                Number(new Date(post2.updatedAt)) -
                Number(new Date(post1.updatedAt))
              )
            })
          )
        } catch (err) {
          console.log(err)
        }
      }
      fetchPurchase()
    }
  }, [user, isAction])

  return (
    <div className="mideumExhibitWidth lg:exhibitWidth m-0 p-12">
      <div className="">
        <h2 className="pb-5"> 購入した商品</h2>
      </div>
      <ScrollArea
        type="scroll"
        scrollbarSize={4}
        scrollHideDelay={3000}
        style={{
          height: 'calc(100vh - 280px)',
        }}
      >
        <Tabs active={activeTab} onTabChange={onChange}>
          <Tabs.Tab label={<p className="px-9"> 出品商品</p>} tabKey="First">
            <ul className="m-0 list-none p-0">
              {purchase.map((value, key) => (
                <li className="" key={key}>
                  <PurchaseCard
                    setIsAction={setIsAction}
                    isAction={isAction}
                    purchase={value}
                  />
                </li>
              ))}
            </ul>
          </Tabs.Tab>
          <Tabs.Tab label={<p className="px-9"> 完了済み</p>} tabKey="Third">
            <ul className="m-0 list-none p-0">
              {purchase.map((value, key) => (
                <li className="" key={key}>
                  <CompleteCard purchase={value} />
                </li>
              ))}
            </ul>
          </Tabs.Tab>
        </Tabs>
      </ScrollArea>
    </div>
  )
}
