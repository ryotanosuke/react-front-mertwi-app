import { Button, Modal, TextInput } from '@mantine/core'
import React, { useState } from 'react'

const test = () => {
  const [opened, setOpened] = useState(false)
  const [seconuntOpened, setSecondOpened] = useState(false)
  const [thirdOpened, setthirdOpened] = useState(false)

  const handleFirstClick = () => {
    console.log('取りました')

    setOpened(false)
    setSecondOpened(true)
  }

  const handleSecondClick = () => {
    console.log('取りました')

    setSecondOpened(false)
    setthirdOpened(true)
  }

  return (
    <div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="商品の情報を入力する"
        className="p-78"
      >
        <div>
          <TextInput className="m-4"></TextInput>
          <Button onClick={handleFirstClick}>内容を確認</Button>
        </div>
      </Modal>
      <Modal
        opened={seconuntOpened}
        onClose={() => setSecondOpened(false)}
        title="商品の確認"
        className="p-78"
      >
        <div>
          <p>以下の内容でよろしいでしょうか？</p>
          <Button onClick={handleSecondClick}>注文を確定する</Button>
        </div>
      </Modal>
      <Modal
        opened={thirdOpened}
        onClose={() => {
          setthirdOpened(false)
        }}
        title="ご注文完了しました。"
        className="p-78"
      >
        <div>
          <p>ご注文ありがとうございます。</p>
        </div>
      </Modal>
      <Button
        className="m-5 mx-3"
        color="violet"
        radius="xl"
        size="md"
        onClick={() => setOpened(true)}
      >
        出品する
      </Button>
    </div>
  )
}

export default test
