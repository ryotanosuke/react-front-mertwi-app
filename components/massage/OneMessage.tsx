import { Badge } from '@mantine/core'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { AuthContext } from '../../state/AuthContext'

export const OneMessage = ({ content }: any) => {
  const { user } = useContext(AuthContext)
  const str = content.time
  const resultStr = str.substring(0, 10)

  const [isUser, setIsUser] = useState(true)

  useLayoutEffect(() => {
    if (user._id !== content.userId) {
      setIsUser(false)
    }
  }, [])

  return (
    <>
      {content.desc != 'undefind' && (
        <li className=" py-4 ">
          {isUser ? (
            <div>
              <div className="flex justify-end">
                <Badge color="indigo" size="xl">
                  {content.desc}
                </Badge>
              </div>
              <p
                className="flex justify-end p-2 text-sm
            "
              >
                {resultStr}
              </p>
            </div>
          ) : (
            <div>
              <div className="flex justify-start">
                <Badge color="gray" size="xl">
                  {content.desc}
                </Badge>
              </div>
              <p
                className="flex justify-start p-2 text-sm
            "
              >
                {resultStr}
              </p>
            </div>
          )}
        </li>
      )}
    </>
  )
}
