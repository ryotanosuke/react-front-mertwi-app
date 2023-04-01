import React from 'react'

export const Item = ({ post }: any) => {
  console.log(post.img)

  return (
    <div>
      {post &&
        (post.isBuyed ? (
          <div className="text-center">
            <p className="text-2xl font-semibold text-red-800">- SOLD OUT -</p>
            {post.img && (
              <img
                className="mt-3 mb-5 max-h-96 w-full object-contain"
                src={process.env.NEXT_PUBLIC_FOLDER + post.img}
                alt=""
              />
            )}
          </div>
        ) : (
          <div>
            <p className="font-semibold"> 説明 </p>
            <p className="m-0 p-0">{post.productName}</p>
            {post.img && (
              <img
                className="mt-6 max-h-96 w-full object-contain"
                src={process.env.NEXT_PUBLIC_FOLDER + post.img}
                alt=""
              />
            )}
            {post.buyerId !== '' && <label htmlFor="">購入済み</label>}
          </div>
        ))}
    </div>
  )
}
