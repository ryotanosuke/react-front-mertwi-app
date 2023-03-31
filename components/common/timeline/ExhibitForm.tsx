import {
  Button,
  Center,
  Paper,
  Select,
  Textarea,
  TextInput,
} from '@mantine/core'
import * as Yup from 'yup'
import React, { useContext, useRef, useState } from 'react'
import { useForm, yupResolver } from '@mantine/form'
import { ExhibitFormType } from '../../../types'
import { AuthContext } from '../../../state/AuthContext'
import { Photo } from 'tabler-icons-react'

const schema = Yup.object().shape({
  status: Yup.string().required('選択されていません'),
  productName: Yup.string().max(40, '40文字以内に入力して下さい。'),
  description: Yup.string()
    .required('入力されていません')
    .max(300, '300文字以内に入力して下さい。'),
  deliveryCharge: Yup.string().required('選択されていません'),
  shippingMethod: Yup.string().required('選択されていません'),
  area: Yup.string().required('選択されていません'),
  shippingDate: Yup.string().required('選択されていません'),
  sellingPrice: Yup.number().required('選択されていません'),
  ProductImg: Yup.string(),
})

export const ExhibitForm = ({
  setOpened,
  setIsAction,
  isAction,
  setFormValue,
  setSecondOpened,
  setFile,
  file,
}: any) => {
  const { user } = useContext(AuthContext)
  const imgRef = useRef()

  const form = useForm<ExhibitFormType>({
    schema: yupResolver(schema),
    initialValues: {
      status: '',
      productName: '',
      description: '',
      deliveryCharge: '',
      shippingMethod: '',
      area: '',
      shippingDate: '',
      sellingPrice: 0,
      ProductImg: '',
    },
  })

  // // 出品ボタンの処理
  const handleSubmit = async (e: any) => {
    //   console.log('ExhibitForm.js:出品の投稿')

    // e.preventDefault()

    const exhibitValues = {
      sellerId: user._id,
      sellerName: user.userName,
      buyerId: '',
      buyerName: '',
      status: form.values.status,
      productName: form.values.productName,
      description: form.values.description,
      deliveryCharge: form.values.deliveryCharge,
      shippingMethod: form.values.shippingMethod,
      area: form.values.area,
      shippingDate: form.values.shippingDate,
      sellingPrice: form.values.sellingPrice,
      ProductImg: form.values.ProductImg,
      isExhibit: true,
      isCompletion: false,
    }

    setFormValue(exhibitValues)

    //   try {
    //     await axios.post(
    //       `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/goods`,
    //       exhibitValues
    //     )

    form.reset()
    //   } catch (err) {
    //     console.log(err)
    //   }

    setIsAction(!isAction)
    setOpened(false)
    setSecondOpened(true)
  }
  return (
    <Paper>
      <form
        onSubmit={form.onSubmit((e) => {
          handleSubmit(e)
        })}
      >
        <Select
          className="py-4"
          label="商品の状態"
          placeholder="どれか一つ選択してください"
          data={[
            { value: '新品', label: '新品' },
            { value: '未使用に近い', label: '未使用に近い' },
            { value: '目立った傷や汚れなし', label: '目立った傷や汚れなし' },
            { value: 'やや傷や汚れあり', label: 'やや傷や汚れあり' },
            { value: '傷や汚れあり', label: '傷や汚れあり' },
            {
              value: '全体的に状態が良くない',
              label: '全体的に状態が良くない',
            },
          ]}
          {...form.getInputProps('status')}
        />
        <TextInput
          className="py-4"
          label="商品名"
          placeholder="40字まで"
          {...form.getInputProps('productName')}
        ></TextInput>
        <Textarea
          className="py-4"
          label="商品の説明"
          placeholder="色、素材、重さ、定価など.."
          {...form.getInputProps('description')}
        ></Textarea>
        <Select
          className="py-4"
          label="配送料の負担"
          placeholder="どれか一つ選択してください"
          data={[
            { value: '出品者負担', label: '送料込み（ 出品者の負担 ）' },
            { value: '購入者負担', label: '着払い（ 購入者の負担 ）' },
          ]}
          {...form.getInputProps('deliveryCharge')}
        />
        <Select
          className="py-4"
          label="配送料の方法"
          placeholder="どれか一つ選択してください"
          data={[
            { value: 'ゆうメール', label: 'ゆうメール' },
            { value: 'レターパック', label: 'レターパック' },
            { value: '普通郵便', label: '普通郵便' },
            { value: 'クロネコヤマト', label: 'クロネコヤマト' },
            { value: 'ゆうパック', label: 'ゆうパック' },
            { value: 'クリックポスト', label: 'クリックポスト' },
            { value: 'ゆうパケット', label: 'ゆうパケット' },
          ]}
          {...form.getInputProps('shippingMethod')}
        />
        <Select
          className="py-4"
          label="発想元の地域"
          placeholder="どれか一つ選択してください"
          data={[
            { value: '北海道', label: '北海道' },
            { value: '東北', label: '東北' },
            { value: '関東', label: '関東' },
            { value: '東海', label: '東海' },
            { value: '関西', label: '関西' },
            { value: '四国', label: '四国' },
            { value: '九州', label: '九州' },
            { value: '沖縄', label: '沖縄' },
          ]}
          {...form.getInputProps('area')}
        />
        <Select
          className="py-4"
          label="発送までの日時"
          placeholder="どれか一つ選択してください"
          data={[
            { value: '１〜２日で発送', label: '１〜２日で発送' },
            { value: '２〜３日で発送', label: '２〜３日で発送' },
            { value: '４〜７日で発送', label: '４〜７日で発送' },
          ]}
          {...form.getInputProps('shippingDate')}
        />
        <TextInput
          className="py-4"
          label="販売価格"
          placeholder="¥300~9,999,999"
          {...form.getInputProps('sellingPrice')}
        ></TextInput>
        <div>
          <label
            htmlFor="file"
            className="shareOptionhover:cursor-pointer hover:underline"
          >
            <div className=" my-3  flex">
              <Photo />
              <span className="pl-3 ">写真を付属</span>
              {file && <span className="pl-4">{`  :  1件追加  `}</span>}
            </div>
            <input
              style={{ display: 'none' }}
              type="file"
              id="file"
              accept=".png, .jpeg, .jpg"
              onChange={(e) => setFile(e.target.files[0])}
              name="file"
              ref={imgRef}
            />
          </label>
        </div>
        <br />
        <Center>
          <Button
            type="submit"
            color="violet"
            className="my-1 h-12 w-64"
            // onClick={handleSubmit}
          >
            出品する
          </Button>
        </Center>
      </form>
    </Paper>
  )
}
