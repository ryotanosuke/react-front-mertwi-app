import React from 'react'

export const Item = ({ purchase }: any) => {
  return (
    <div>
      <div className="flex items-center">
        <img
          className="h-14 w-14 border-4 border-solid border-white object-cover"
          src={process.env.NEXT_PUBLIC_FOLDER + purchase.img}
          alt=""
        />
        <div className="py-4 pl-4">
          <div className="pb-2">{`商品名：${purchase.productName}`}</div>
          <div>{`値段：${purchase.sellingPrice}`}</div>
        </div>
      </div>
    </div>
  )
}
