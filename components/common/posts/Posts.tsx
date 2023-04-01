import { Accordion, Button, Menu, Modal, Select } from '@mantine/core'
import * as Yup from 'yup'
import { Avatar } from '@mantine/core'
import axios from 'axios'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import {
  Download,
  Heart,
  MessageCircle,
  Settings,
  ThumbDown,
} from 'tabler-icons-react'
import { AuthContext } from '../../../state/AuthContext'
import { Item } from './Item'
import { useRef } from 'react'
import { useForm, yupResolver } from '@mantine/form'
import { Point } from '../../../types'

interface userType {
  coverPictur: ''
  createdAt: ''
  email: ''
  followers: []
  followings: []
  isAdmin: false
  profilePicture: ''
  userName: ''
  _id: ''
  buyerId: ''
  isBuyed: false
  stockPoint: 0
  point: 0
}

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

export const Posts = ({ post, setIsAction, isAction, isSuperAction }: any) => {
  const { user } = useContext(AuthContext)
  const [postUser, setPostUser] = useState<userType>({
    coverPictur: '',
    createdAt: '',
    email: '',
    followers: [],
    followings: [],
    isAdmin: false,
    profilePicture: '',
    userName: '',
    _id: '',
    buyerId: '',
    isBuyed: false,
    stockPoint: 0,
    point: 0,
  })
  const [loginUser, setLoginUser] = useState({
    point: 0,
    _id: '',
  })
  const [isLoginUser, setIsLoginUser] = useState(false)
  const [purchaseOpened, setPurchaseOpened] = useState(false)
  const [pointOpened, setPointOpened] = useState(false)
  const [pointCompleteOpened, setPointCompleteOpened] = useState(false)
  const [finalOpened, setFinalOpened] = useState(false)
  const ref = useRef<HTMLInputElement>()
  const pointData = [...Array(20)].map((_, i) => {
    return { value: `${(i + 1) * 1000}`, label: `¥ ${(i + 1) * 1000}` }
  })

  const form = useForm<Point>({
    schema: yupResolver(schema),
    initialValues: {
      point: 0,
    },
  })

  useEffect(() => {
    console.log('環境変数=======' + process.env.NEXT_PUBLIC_FOLDER)

    if (post) {
      try {
        const fetchPostUser = async () => {
          if (post.userId) {
            //user.js（ No.3 ）
            axios
              .get(
                `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/users/${post.userId}`
              )
              .then((response) => {
                setPostUser(response.data)
              })
          } else {
            axios
              .get(
                `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/users/${post.sellerId}`
              )
              .then((response) => {
                setPostUser(response.data)
              })
          }
        }

        fetchPostUser()
        setIsLoginUser(post.sellerId == user._id)
      } catch (err) {
        console.log(err)
      }
    }
    try {
      const fetchLoginUser = async () => {
        axios
          .get(`${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/users/${user._id}`)
          .then((response) => {
            setLoginUser(response.data)
          })
      }
      fetchLoginUser()
    } catch (err) {
      console.log(err)
    }
  }, [post, isSuperAction])

  const deletePost = async () => {
    console.log('Post.js:記事の削除')

    try {
      await axios
        // No.3(post) と通信
        .delete(
          `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/posts/${post._id}`,
          {
            // 便宜上、ログイン者のUserIDではなく投稿者のUserIDを送信(他人の投稿も削除可能)
            data: {
              userId: post.userId,
              sellerId: post.sellerId,
              isExhibit: post.isExhibit,
            },
          }
        )
        .then((res) => {
          // リロードしなくても投稿を反映させる
          setIsAction(!isAction)
        })
    } catch (err) {
      console.log(err)
    }
  }

  const firstModalFunction = () => {
    if (post.sellingPrice > loginUser.point) {
      setPointOpened(true)
    } else {
      setPurchaseOpened(true)
    }
  }

  const addPoint = () => {
    // 購入額 + 現在の額
    const loginUserPoint = {
      point:
        Number(loginUser.point) + Math.abs(loginUser.point - post.sellingPrice),
    }

    const pointUpdate = async () => {
      try {
        axios.put(
          // goods.js（ No.4 ）
          `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/users/${loginUser._id}`,
          loginUserPoint
        )
      } catch (err) {
        console.log(err)
      }
    }
    pointUpdate()
    setPointOpened(false)
    setPointCompleteOpened(true)
    setIsAction(!isAction)
  }

  const moveOrder = () => {
    setPointCompleteOpened(false)
    setPurchaseOpened(true)
  }

  const buyAction = () => {
    console.log('Post.js:商品の購入')

    const pointDdata = { point: Number(loginUser.point - post.sellingPrice) }

    const postUserPoingt = {
      stockPoint: postUser.stockPoint + post.sellingPrice,
    }

    const goodsUpdate = async () => {
      try {
        axios.put(
          // goods.js（ No.4 ）
          `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/goods/buy/${post._id}`,
          user
        )
      } catch (err) {
        console.log(err)
      }
    }
    const pointUpdate = async () => {
      try {
        // loginユーザーのポイント反映
        axios.put(
          // user.js（ No.1 ）
          `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/users/${loginUser._id}`,
          pointDdata
        )
        // postユーザーの仮ポイント反映
        axios.put(
          // user.js（ No.1 ）
          `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/users/${postUser._id}`,
          postUserPoingt
        )
      } catch (err) {
        console.log(err)
      }
    }
    pointUpdate()
    goodsUpdate()

    setIsAction(!isAction)
    setPurchaseOpened(false)
    setFinalOpened(true)
  }

  return (
    <>
      <Modal
        opened={pointOpened}
        onClose={() => setPointOpened(false)}
        title={<h3>Pointが足りません</h3>}
        className="p-32"
      >
        <div>
          <p>{`現在のポイント : ${loginUser.point}`}</p>
          <p>
            {` 不足分 : `}
            <span className="text-red-600">
              {` - ¥ ${Math.abs(loginUser.point - post.sellingPrice)}`}
            </span>
          </p>
          <p>{`¥ ${Math.abs(
            loginUser.point - post.sellingPrice
          )} 分購入しますか？`}</p>
          <Button className="my-6" type="submit" onClick={addPoint}>
            購入する
          </Button>
        </div>
      </Modal>
      <Modal
        opened={pointCompleteOpened}
        onClose={() => setPointCompleteOpened(false)}
        title={<h3>ポイントが購入されました</h3>}
        className="p-78"
      >
        <div>
          <p>{`現在のポイント : ${loginUser.point}`}</p>
          <Button
            onClick={
              moveOrder
              // setPurchaseOpened(true)
              //
            }
          >
            注文に移動
          </Button>
        </div>
      </Modal>
      <Modal
        opened={purchaseOpened}
        onClose={() => setPurchaseOpened(false)}
        title={<h3>商品の確認</h3>}
        className="p-78"
      >
        <div>
          <p>以下の内容でよろしいでしょうか？</p>
          <p>{`値段：¥ ${post.sellingPrice}`}</p>
          <p>{`商品名：${post.productName}`}</p>
          <p>{`商品説明：${post.description}`}</p>
          <p>{`現在のポイント：${loginUser.point}`}</p>
          <p>{`購入後のポイント：${loginUser.point - post.sellingPrice}`}</p>
          <Button onClick={buyAction}>注文を確定する</Button>
        </div>
      </Modal>
      <Modal
        opened={finalOpened}
        onClose={() => {
          setFinalOpened(false)
        }}
        title={<h3>注文が完了しました！</h3>}
        className="p-78"
      >
        <div>
          <p>ご注文ありがとうございます。</p>
          <p>商品はメニューの購入した商品から確認できます。</p>
        </div>
      </Modal>
      <div className="min-h-64 ">
        <div className="">
          <div className="mt-4 flex justify-between ">
            <Link href={`/profile/${post.userId || post.sellerId}`}>
              <a className="flex text-inherit no-underline hover:underline">
                <div className="">
                  <Avatar className="mr-2 h-16 w-16" />
                </div>
                <div className="ml-3 min-h-fit w-full ">
                  <div className="flex justify-between ">
                    <div>
                      <h4>{postUser.userName}</h4>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
            <span>
              <Menu trigger="click" placement="end" withArrow>
                <Menu.Label>編集</Menu.Label>
                <Menu.Item onClick={deletePost} icon={<Settings size={16} />}>
                  削除
                </Menu.Item>
              </Menu>
            </span>
          </div>
          <div className="p-10">
            {post.isExhibit ? (
              <Accordion initialItem={-1} iconPosition="right">
                <Accordion.Item label={<Item post={post} />} key={post._id}>
                  <div className="text-gray-800">
                    <p>
                      <span className="inline-block w-24 font-semibold">
                        値段
                      </span>
                      <span>{`¥ ${post.sellingPrice}`}</span>
                    </p>

                    <p>
                      <span className="inline-block w-24 font-semibold">
                        商品名
                      </span>
                      <span>{post.productName}</span>
                    </p>
                    <p>
                      <span className="inline-block w-24 font-semibold">
                        商品状態
                      </span>
                      <span>{post.status}</span>
                    </p>
                    <p>
                      <span className="inline-block w-24 font-semibold">
                        発送値
                      </span>
                      <span>{post.area}</span>
                    </p>
                    <p>
                      <span className="inline-block w-24 font-semibold">
                        負担者
                      </span>
                      <span>{post.deliveryCharge}</span>
                    </p>
                    <p>
                      <span className="inline-block w-24 font-semibold">
                        出品者
                      </span>
                      <span>{post.sellerName}</span>
                    </p>

                    {post.sellerId !== user._id! && !post.isBuyed && (
                      <Button
                        className="m-4 ml-0"
                        // onClick={buyAction}
                        // onClick={() => setOpened(true)}
                        onClick={firstModalFunction}
                      >
                        購入する
                      </Button>
                    )}
                  </div>
                </Accordion.Item>
              </Accordion>
            ) : (
              <div>
                <div className="">
                  <span className="">{post.desc}</span>
                  <img
                    className="mt-6 max-h-96 w-full object-contain"
                    src={process.env.NEXT_PUBLIC_FOLDER + post.img}
                    alt=""
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-around  ">
            <Heart />
            <ThumbDown />
            <Download />
          </div>
        </div>
      </div>
    </>
  )
}
