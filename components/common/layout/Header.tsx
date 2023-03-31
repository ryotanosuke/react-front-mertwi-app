import { UserIcon } from '@heroicons/react/outline'
import { CubeIcon } from '@heroicons/react/solid'
import { TextInput } from '@mantine/core'
import Head from 'next/head'
import Link from 'next/link'
import { useContext } from 'react'
import { AuthContext } from '../../../state/AuthContext'

export const Header = ({ children, title = 'Mestwi' }) => {
  const { user } = useContext(AuthContext)

  const handleLogout = () => {
    if (user) {
      localStorage.removeItem('user')
    }
  }

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <header className=" bg-white">
        <div
          className="
          flex 
          w-screen
          items-center
          justify-between
          shadow-sm
          shadow-gray-300
          "
        >
          <div className="flex items-center">
            <CubeIcon className="w-12 pl-4 text-blue-500" />
            <h1
              className="font-weight
            m-0 py-4 pl-1 text-2xl
            "
            >
              Mertwi
            </h1>
            <TextInput
              className="
              ml-12
              hidden
              border-gray-200
              lg:block
              "
              style={{
                width: '400px',
              }}
              placeholder="何かお探しですか？"
              radius="lg"
            />
          </div>
          <div className="flex px-9">
            <Link href={`/profile/${user && user._id}`}>
              <a className="flex items-center text-inherit no-underline">
                <UserIcon className="w-6" />
                <span className="pl-1 font-semibold hover:underline">
                  {user && user.userName}
                </span>
              </a>
            </Link>

            <a href="/" className="flex items-center text-inherit no-underline">
              <span
                className="pl-10 font-semibold hover:underline"
                onClick={handleLogout}
              >
                ログアウト
              </span>
            </a>
          </div>
        </div>
      </header>
      <main className="">{children}</main>
    </div>
  )
}
