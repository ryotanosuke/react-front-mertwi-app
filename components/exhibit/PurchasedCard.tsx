import { Accordion } from '@mantine/core'
import React from 'react'
import { Item } from './Item'

export const PurshasedCard = ({ exhibit }: any) => {
  return (
    <div>
      {!exhibit.isCompletion && exhibit.isBuyed && (
        <Accordion initialItem={-1} iconPosition="right">
          <Accordion.Item label={<Item exhibit={exhibit} />} key={exhibit._id}>
            <div className="pb-8">
              <div>
                <span className="inline-block w-28 pb-4 pt-4">商品概要</span>
                <span>{exhibit.description}</span>
              </div>
              <div>
                <span className="inline-block w-28  pb-4">商品状態</span>
                <span>{exhibit.status}</span>
              </div>
              <div>
                <span className="inline-block w-28 pb-4">配送負担者</span>
                <span>{exhibit.deliveryCharge}</span>
              </div>
              <div>
                <span className="inline-block w-28 pb-4">配送方法</span>
                <span>{exhibit.shippingMethod}</span>
              </div>
              <div>
                <span className="inline-block w-28 pb-4">地域</span>
                <span>{exhibit.area}</span>
              </div>
              <div>
                <span className="inline-block w-28 pb-4">発送日持</span>
                <span>{exhibit.shippingDate}</span>
              </div>
              <div>
                <span className="inline-block w-28 pb-4">出品者</span>
                <span>{exhibit.sellerName}</span>
              </div>

              <div>
                <span className="inline-block w-28 pb-4">購入者</span>
                <span>{exhibit.buyerName}</span>
              </div>
            </div>
          </Accordion.Item>
        </Accordion>
      )}
    </div>
  )
}
