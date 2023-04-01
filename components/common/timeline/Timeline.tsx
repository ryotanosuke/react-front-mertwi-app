import {
  Avatar,
  Button,
  Image,
  LoadingOverlay,
  Modal,
  Textarea,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ExhibitForm } from './ExhibitForm'
import { Posts } from '../posts/Posts'
import { ScrollArea } from '@mantine/core'
import { AuthContext } from '../../../state/AuthContext'
import { Photo } from 'tabler-icons-react'

export const Timeline = ({ isSuperAction, setIsSuperAction }: any) => {
  const [opened, setOpened] = useState(false)
  const [seconuntOpened, setSecondOpened] = useState(false)
  const [thirdOpened, setthirdOpened] = useState(false)
  const [posts, setPosts] = useState([])
  const [isAction, setIsAction] = useState(false)
  const { user } = useContext(AuthContext)
  const [visible, setVisible] = useState(false)
  const imgRef = useRef()
  const [file, setFile] = useState(null)
  const [formValue, setFormValue] = useState({
    sellerId: user._id,
    sellerName: '',
    buyerId: '',
    status: '',
    productName: '',
    description: '',
    deliveryCharge: '',
    shippingMethod: '',
    area: '',
    sellingPrice: '',
    img: '',
  })

  useEffect(() => {
    setVisible((v) => !v)
    if (user) {
      const fetchPosts = async () => {
        await axios
          .get(
            // 投稿と出品のフェッチ（ posts.js NO.7 ）
            `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/posts/timeline/${user._id}`
          )
          .then((response) => {
            setPosts(
              // dataであることに注意
              response.data.sort((post1: any, post2: any) => {
                return (
                  Number(new Date(post2.createdAt)) -
                  Number(new Date(post1.createdAt))
                )
              })
            )
          })
      }
      fetchPosts()
      setVisible((v) => !v)
    }
  }, [isAction, isSuperAction])

  const form = useForm({
    initialValues: { desc: '' },
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const newPost = {
      userId: user._id,
      desc: form.values.desc,
      img: '',
    }

    if (file) {
      const data = new FormData()
      const fileName = Date.now() + file.name
      data.append('name', fileName)
      data.append('file', file)
      newPost.img = fileName
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/upload`,
          data
        )
      } catch (err) {
        console.log(err)
      }
    }

    try {
      // posts.js（ No.1 ）
      await axios.post(
        `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/posts`,
        newPost
      )

      setFile(null)
      setIsAction(!isAction)

      form.reset()
    } catch (err) {
      console.log(err)
    }
  }

  const handleExhibit = async () => {
    if (file) {
      const data = new FormData()
      const fileName = Date.now() + file.name
      data.append('name', fileName)
      data.append('file', file)
      formValue.img = fileName

      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/upload`,
          data
        )
      } catch (err) {
        console.log(err)
      }
    }

    try {
      await axios.post(
        //goods.js（ No.1 ）
        `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/goods`,
        formValue
      )
    } catch (err) {
      console.log(err)
    }

    setFile(null)
    setIsAction(!isAction)
    setSecondOpened(false)
    setthirdOpened(true)
  }

  const onFileChange = (e: any) => {
    setFile(e.target.files[0])
  }

  return (
    <div className="">
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="商品の情報を入力する"
        className="p-78"
      >
        <ExhibitForm
          setOpened={setOpened}
          setIsAction={setIsAction}
          isAction={isAction}
          setFormValue={setFormValue}
          setSecondOpened={setSecondOpened}
          setFile={setFile}
          file={file}
        />
      </Modal>
      <Modal
        opened={seconuntOpened}
        onClose={() => setSecondOpened(false)}
        title="商品の確認"
        className="p-78"
      >
        <div>
          <p>以下の内容でよろしいでしょうか？</p>
          <p>{`出品者 : ${formValue.sellerName}`}</p>
          <p>{`商品名 : ${formValue.productName}`}</p>
          <p>{`値段 : ${formValue.sellingPrice}`}</p>
          <p>{`商品説明 : ${formValue.description}`}</p>
          <p>{`商品状態 : ${formValue.status}`}</p>
          <p>{`配送負担者 : ${formValue.deliveryCharge}`}</p>
          <p>{`配送方法 : ${formValue.shippingMethod}`}</p>
          <p>{`発送値 : ${formValue.area}`}</p>
          <Button onClick={handleExhibit}>出品を確定する</Button>
        </div>
      </Modal>
      <Modal
        opened={thirdOpened}
        onClose={() => {
          setthirdOpened(false)
        }}
        title={<h3>出品が完了しました。</h3>}
        className="p-78"
      >
        <div>
          <p>メニューの出品した商品から確認できます。</p>
        </div>
      </Modal>

      {/* <div className="mr-14 w-full border border-y-0 border-l-0 border-solid border-blue-700"> */}
      <div className="">
        <ScrollArea
          type="scroll"
          scrollbarSize={4}
          scrollHideDelay={3000}
          style={{
            height: 'calc(100vh - 61px)',
          }}
          className="timlineWidth"
        >
          <div className="m-12 rounded-3xl bg-white p-12 shadow-md shadow-gray-200">
            <div className="flex items-center">
              <Avatar className="mr-2 h-16 w-16" />
              <h4>{user && user.userName}</h4>
            </div>

            {/* <form
              onSubmit={form.onSubmit((e) => {
                handleSubmit(e)
              })}
            > */}
            <form
              onSubmit={(e) => {
                handleSubmit(e)
              }}
            >
              <Textarea
                className="my-12 border border-x-0 
                
                border-t-0 border-solid border-gray-400
                "
                placeholder="今何している？"
                required
                variant="unstyled"
                size="lg"
                autosize
                minRows={1}
                maxRows={4}
                {...form.getInputProps('desc')}
              ></Textarea>

              <label
                htmlFor="file"
                className="shareOption hover:cursor-pointer"
              >
                <div className="flex hover:underline">
                  <Photo />
                  <span className="pl-3 ">写真を付属</span>
                  {file && <span className="pl-4">{`  :  1件追加  `}</span>}
                </div>
                <input
                  style={{ display: 'none' }}
                  type="file"
                  id="file"
                  accept=".png, .jpeg, .jpg"
                  onChange={(e) => onFileChange(e)}
                  name="file"
                  ref={imgRef}
                />
              </label>

              <div className="mt-6 flex justify-end">
                <Button
                  className="mx-3"
                  color="indigo"
                  radius="xl"
                  size="sm"
                  type="submit"
                  onClick={handleSubmit}
                >
                  ツイートする
                </Button>
                <Button
                  className="mx-3"
                  color="violet"
                  radius="xl"
                  size="sm"
                  onClick={() => setOpened(true)}
                >
                  出品する
                </Button>
              </div>
            </form>
          </div>

          <div className="w-full">
            <LoadingOverlay visible={visible} />
            <ul className="m-0  w-full list-none p-0">
              {posts.map((post, key) => (
                <li
                  className="m-12 rounded-3xl   bg-white p-12 shadow-sm shadow-gray-300"
                  key={key}
                >
                  <Posts
                    post={post}
                    isAction={isAction}
                    setIsAction={setIsAction}
                    isSuperAction={isSuperAction}
                    setIsSuperAction={setIsSuperAction}
                  />
                </li>
              ))}
            </ul>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
