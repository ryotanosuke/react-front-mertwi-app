import { Accordion } from '@mantine/core'
import React from 'react'
import { Item } from './Item'

export const CompleteCard = ({ purchase }: any) => {
  console.log('テスト')
  console.log(purchase.isCompletion)
  console.log(purchase)

  return (
    <div>
      {purchase.isCompletion && (
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
            </div>
          </Accordion.Item>
        </Accordion>
      )}
    </div>
  )
}
