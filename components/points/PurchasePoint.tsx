import { Button, Modal, Select } from '@mantine/core'
import axios from 'axios'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { AuthContext } from '../../state/AuthContext'
import * as Yup from 'yup'
import { Point } from '../../types'
import { useForm, yupResolver } from '@mantine/form'

const schema = Yup.object().shape({
  point: Yup.number().required('選択されていません'),
})

export const PurchasePoint = ({ isSuperAction, setSuperIsAction }: any) => {
  const { user } = useContext(AuthContext)
  const [loginUser, setLoginUser] = useState({
    username: '',
    followers: [],
    _id: '',
    talkers: [],
    point: 0,
    stockPoint: 0,
  })
  const pointData = [...Array(20)].map((_, i) => {
    return { value: `${(i + 1) * 1000}`, label: `¥ ${(i + 1) * 1000}` }
  })

  const form = useForm<Point>({
    schema: yupResolver(schema),
    initialValues: {
      point: 0,
    },
  })

  const [opened, setOpened] = useState(false)
  const [seconuntOpened, setSecondOpened] = useState(false)
  const [purchasedPoint, setPurchasedPoint] = useState(0)

  useLayoutEffect(() => {
    if (user) {
      const fetchuser = async () => {
        try {
          console.log('PurchasePoint.js:ユーザーのポイントを取得')

          await axios
            .get(
              `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/users/${user._id}`
            )
            .then((response) => {
              setLoginUser(response.data)
            })
        } catch (err) {
          console.log(err)
        }
      }
      fetchuser()
    }
  }, [isSuperAction])

  const handleFirstClick = () => {
    setOpened(true)
    setPurchasedPoint(form.values.point)
  }

  const addPoint = () => {
    const point = {
      point: Number(form.values.point) + Number(loginUser.point),
    }

    const pointUpdate = async () => {
      try {
        axios.put(
          // goods.js（ No.4 ）
          `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/users/${loginUser._id}`,
          point
        )
      } catch (err) {
        console.log(err)
      }
    }
    form.reset()
    setOpened(false)
    setSecondOpened(true)
    pointUpdate()
    setSuperIsAction(!isSuperAction)
  }

  return (
    <div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={<span className="font-semibold"> 注文の確認</span>}
        className="p-78"
      >
        <p>以下のポイント分購入しますか？</p>
        <p className="font-semibold">{`¥${purchasedPoint}`}</p>
        <Button onClick={addPoint}>出品を確定する</Button>
      </Modal>

      <Modal
        opened={seconuntOpened}
        onClose={() => setSecondOpened(false)}
        title={<span className="font-semibold"> 注文を確定いたしました。</span>}
        className="p-78"
      >
        <p>メルツイPoint画面から現在の額を確認できます。</p>
        <div></div>
      </Modal>

      <div
        className="mideumPointWidth lg:exhibitWidth m-0 p-12"
        style={{
          height: 'calc(100vh - 61px)',
        }}
      >
        <div className="border border-x-0  border-t-0 border-solid border-blue-700">
          <h2>出品した商品</h2>
        </div>
        <div className="pt-2">
          <h3>{`現在のポイント：${loginUser.point}`}</h3>
          <h4>{`留保されたポイント：${loginUser.stockPoint}`}</h4>
          <form onSubmit={form.onSubmit(handleFirstClick)}>
            <Select
              className="py-6"
              data={pointData}
              placeholder="Pick all you like"
              label="add point"
              radius="lg"
              {...form.getInputProps('point')}
            />
            <Button className="my-6" type="submit">
              Pointを購入
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
