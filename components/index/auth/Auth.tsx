import * as Yup from 'yup'
import { CubeIcon } from '@heroicons/react/solid'
import { ExclamationCircleIcon } from '@heroicons/react/outline'
import { useForm, yupResolver } from '@mantine/form'
import {
  Anchor,
  TextInput,
  Button,
  Group,
  PasswordInput,
  Alert,
} from '@mantine/core'
import { AuthForm } from '../../../types'
import axios from 'axios'
import { useLogin } from '../../../state/useLogin'
import { useContext, useState } from 'react'
import { AuthContext } from '../../../state/AuthContext'

//バリデーション設定(shape = 形)
const schema = Yup.object().shape({
  // string型,emailのフォーマット,入力必須
  email: Yup.string()
    .email('無効なメール形式です')
    .required('Eメールアドレスが入力されていません'),
  password: Yup.string()
    .required('パスワードが入力されていません')
    .min(8, '８文字以上含めて下さい')
    .matches(/[a-z]+/, '小文字を含めて下さい')
    .matches(/[A-Z]+/, '大文字を含めて下さい')
    .matches(/[@$!%*#?&]+/, '記号を含めて下さい'),
  area: Yup.string(),
})

export const Auth = () => {
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')
  const { dispatch, user } = useContext(AuthContext)

  const doLogin = useLogin

  const form = useForm<AuthForm>({
    schema: yupResolver(schema),
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      city: '',
    },
  })

  // サブミット時に実行
  const useHandleSubmit = async () => {
    const userName = `${form.values.firstName} ${form.values.lastName}`

    const AuthValues = {
      userName: userName,
      email: form.values.email,
      password: form.values.password,
      city: form.values.city,
    }

    if (isRegister) {
      try {
        // auth.js（ No.1 ）
        await axios
          .post(
            `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/auth/register`,
            AuthValues
          )
          .then((response) => {
            doLogin(
              {
                email: response.data.email,
                password: response.data.password,
              },
              dispatch
            )
          })
      } catch (err) {
        console.log(err)
      }
    } else {
      try {
        // auth.js（ No.2 ）
        await axios
          .post(
            `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/api/auth/login`,
            AuthValues
          )
          .then((respanse) => {
            doLogin(
              {
                email: respanse.data.email,
                password: respanse.data.password,
              },
              dispatch
            )
          })
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <div className="flex min-h-screen transform animate-fade-in-down bg-gray-100 text-gray-100">
      <main className="flex flex-1 flex-col justify-center p-4">
        <Group direction="column" position="center">
          <CubeIcon className="h-16 w-16 text-blue-500" />
          {error && (
            <Alert
              mt="md"
              icon={<ExclamationCircleIcon className="text-pink-500" />}
              title="Authorization Error"
              color="red"
              radius="md"
            >
              {error}
            </Alert>
          )}
          <form
            //form.onSubmitでもう一度囲む
            onSubmit={form.onSubmit(useHandleSubmit)}
            style={{ width: 380 }}
          >
            {isRegister && (
              <Group grow>
                <TextInput
                  data-autofocus
                  placeholder="Your first name"
                  label="First name*"
                  {...form.getInputProps('firstName')}
                />
                <TextInput
                  placeholder="Your last name"
                  label="Last name*"
                  {...form.getInputProps('lastName')}
                />
              </Group>
            )}
            <TextInput
              mt="md"
              id="email"
              label="Email*"
              placeholder="example@gmail.com"
              // 値の表示と更新を行う（idと合わせる）
              {...form.getInputProps('email')}
            />
            <PasswordInput
              mt="md"
              id="password"
              placeholder="password"
              label="Password*"
              description="Must include one upper + lower char & special char"
              {...form.getInputProps('password')}
            />
            {isRegister && (
              <TextInput
                mt="md"
                id="city"
                label="city"
                placeholder="東京"
                {...form.getInputProps('city')}
              />
            )}
            <Group className="mt-9" mt="lg" position="apart">
              <Anchor
                //ボタンとリンクさせる
                component="button"
                type="button"
                color="gray"
                onClick={() => {
                  setIsRegister(!isRegister)
                  setError('')
                }}
                size="sm"
              >
                {isRegister
                  ? 'Have an account? Login'
                  : "Don't have an account? Register"}
              </Anchor>
              <Button type="submit">{isRegister ? 'Register' : 'Login'}</Button>
            </Group>
          </form>
        </Group>
      </main>
    </div>
  )
}
