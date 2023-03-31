import Link from 'next/link'
import React, { useContext } from 'react'
import {
  Coin,
  Hanger,
  Home,
  Logout,
  Message,
  ShoppingCart,
  User,
} from 'tabler-icons-react'
import { AuthContext } from '../../../state/AuthContext'

export const Menu = () => {
  const { user } = useContext(AuthContext)

  const handleLogout = () => {
    if (user) {
      localStorage.removeItem('user')
    }
    window.location.reload()
  }

  return (
    <div className="">
      <div
        className="lg:menuWidth border-2  border-y-0 border-l-0 border-solid border-gray-300 pl-2"
        style={{
          height: 'calc(100vh - 61px)',
        }}
      >
        <ul className="m-0 p-0 pr-5 pt-8 text-lg ">
          <li
            className="mb-6 list-none  rounded-3xl  p-3 font-bold 
              transition-all
              hover:bg-gray-300 hover:ease-in"
          >
            <Link href="/">
              <a className=" flex items-center text-inherit no-underline">
                <Home className="" />
                <span className=" ml-2 hidden  lg:block">ホーム</span>
              </a>
            </Link>
          </li>
          <li className="mb-6 list-none rounded-3xl p-3 font-bold transition-all hover:bg-gray-300 hover:ease-in">
            <Link href={`/profile/${user && user._id}`}>
              <a className="flex items-center text-inherit no-underline">
                <User />
                <span className="ml-2 hidden  lg:inline">プロフィール</span>
              </a>
            </Link>
          </li>
          <li className="mb-6 list-none rounded-3xl p-3 font-bold transition-all hover:bg-gray-300 hover:ease-in">
            <Link href={`/message/${user && user._id}`}>
              <a className="flex items-center text-inherit no-underline">
                <Message />
                <span className="ml-2  hidden  lg:inline">メッセージ</span>
              </a>
            </Link>
          </li>
          <li className="mb-6 list-none rounded-3xl p-3 font-bold transition-all hover:bg-gray-300 hover:ease-in">
            <Link href="/exhibit">
              <a className="flex items-center  text-inherit no-underline">
                <Hanger />
                <span className=" ml-2 hidden  lg:inline">出品した商品</span>
              </a>
            </Link>
          </li>
          <li className="mb-6  list-none rounded-3xl p-3 font-bold transition-all hover:bg-gray-300 hover:ease-in">
            <Link href="/purchase">
              <a className="flex items-center text-inherit no-underline">
                <ShoppingCart />
                <span className=" ml-2 hidden  lg:inline">購入した商品</span>
              </a>
            </Link>
          </li>
          <Link href="/points">
            <li className="mb-6 list-none rounded-3xl p-3 font-bold transition-all hover:bg-gray-300 hover:ease-in">
              <a className="flex items-center  text-inherit no-underline">
                <Coin />
                <span className="ml-2 hidden hover:cursor-pointer  lg:inline">
                  メルツイPoint
                </span>
              </a>
            </li>
          </Link>

          <Link href="/">
            <li
              className="mb-6 list-none rounded-3xl p-3 font-bold 
          transition-all
          hover:bg-gray-300 hover:ease-in"
            >
              <a className="flex items-center text-inherit no-underline">
                <Logout />
                <span
                  className=" ml-2 hidden  lg:inline"
                  onClick={handleLogout}
                >
                  ログアウト
                </span>
              </a>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  )
}
