import React from 'react'

export const ChooseUser = ({ interLocutorsUsers }: any) => {
  return (
    <div
      className="chooseUserWidth border border-y-0  border-l-0 border-solid border-gray-300 "
      style={{
        height: 'calc(100vh - 61px)',
      }}
    >
      {interLocutorsUsers.length == 0 ? (
        <h2 className="pt-12 text-center text-gray-600">
          プロフィール画面からメッセージを送信できます。
        </h2>
      ) : (
        <h2 className="pt-12 text-center text-gray-600">
          ユーザを選択してください。
        </h2>
      )}
    </div>
  )
}
