import { Accordion, Button, Modal, ScrollArea, TextInput } from '@mantine/core'
import axios from 'axios'
import React, { useLayoutEffect, useState } from 'react'
import { Item } from './Item'

interface AccordionLabelProps {
  label: string
  image: string
  description: string
}

interface InitialType {
  status: ''
  productName: ''
  description: ''
  deliveryCharge: ''
  shippingMethod: ''
  area: ''
  shippingDate: ''
  sellingPrice: ''
}

interface userType {
  coverPictur: ''
  createdAt: ''
  email: ''
  followers: []
  followings: []
  isAdmin: false
  profilePicture: ''
  userName: ''
  _id: ''
  buyerId: ''
  isBuyed: false
  stockPoint: 0
  point: 0
}

export const PurchaseCard = ({ purchase, isAction, setIsAction }: any) => {
  const [opened, setOpened] = useState(false)
  const [exhibitUser, setExhibitUser] = useState<userType>({
    coverPictur: '',
    createdAt: '',
    email: '',
    followers: [],
    followings: [],
    isAdmin: false,
    profilePicture: '',
    userName: '',
    _id: '',
    buyerId: '',
    isBuyed: false,
    stockPoint: 0,
    point: 0,
  })
  const [seconuntOpened, setSecondOpened] = useState(false)

  useLayoutEffect(() => {
    try {
      const fetchExhibitUser = async () => {
        axios
          .get(
            `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/users/${purchase.sellerId}`
          )
          .then((response) => {
            setExhibitUser(response.data)
          })
      }

      fetchExhibitUser()
    } catch (err) {
      console.log(err)
    }
  }, [])

  const handleFirstClick = () => {
    // purchase isCompletionをtrueにする
    const goodsComplete = async () => {
      try {
        axios.put(
          // goods.js（ No.4 ）
          `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/goods/completion/${purchase._id}`
        )
      } catch (err) {
        console.log(err)
      }
    }

    const pointUpdate = async () => {
      const stockPoint = {
        stockPoint: exhibitUser.stockPoint - Number(purchase.sellingPrice),
      }
      const point = {
        point: exhibitUser.point + Number(purchase.sellingPrice),
      }

      try {
        // 出品者の仮ポイント反映
        axios.put(
          // user.js（ No.1 ）
          `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/users/${purchase.sellerId}`,
          stockPoint
        )
        // 出品者の本ポイント反映
        axios.put(
          // user.js（ No.1 ）
          `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/users/${purchase.sellerId}`,
          point
        )
      } catch (err) {
        console.log(err)
      }
    }

    pointUpdate()
    goodsComplete()

    setIsAction(!isAction)

    setOpened(false)
    setSecondOpened(true)
  }

  return (
    <div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="商品の確認"
        className="p-78"
      >
        <div>
          商品のチェックを確認しましたか？
          <Button className="my-9" onClick={handleFirstClick}>
            商品の内容を確認しました
          </Button>
        </div>
      </Modal>
      <Modal
        opened={seconuntOpened}
        onClose={() => {
          setSecondOpened(false)
        }}
        title="手続きが完了しました"
        className="p-78"
      >
        <div>
          <p>完了タグから確認できます</p>
        </div>
      </Modal>
      {!purchase.isCompletion && (
        <Accordion initialItem={-1} iconPosition="right">
          <Accordion.Item
            label={<Item purchase={purchase} />}
            key={purchase._id}
          >
            <div className="pb-8">
              <div>
                <span className="inline-block w-28 pb-4 pt-4">商品概要</span>
                <span>{purchase.description}</span>
              </div>
              <div>
                <span className="inline-block w-28  pb-4">商品状態</span>
                <span>{purchase.status}</span>
              </div>
              <div>
                <span className="inline-block w-28 pb-4">配送負担者</span>
                <span>{purchase.deliveryCharge}</span>
              </div>
              <div>
                <span className="inline-block w-28 pb-4">配送方法</span>
                <span>{purchase.shippingMethod}</span>
              </div>
              <div>
                <span className="inline-block w-28 pb-4">地域</span>
                <span>{purchase.area}</span>
              </div>
              <div>
                <span className="inline-block w-28 pb-4">発送日持</span>
                <span>{purchase.shippingDate}</span>
              </div>
              <div>
                <span className="inline-block w-28 pb-4">出品者</span>
                <span>{purchase.sellerName}</span>
              </div>
              <div>
                <span className="inline-block w-28 pb-4">購入者</span>
                <span>{purchase.buyerName}</span>
              </div>
            </div>
            <Button className="mb-8" onClick={() => setOpened(true)}>
              手続き完了
            </Button>
          </Accordion.Item>
        </Accordion>
      )}
    </div>
  )
}
