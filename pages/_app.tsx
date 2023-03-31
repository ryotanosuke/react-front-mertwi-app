import '../styles/globals.css'
import type { AppProps } from 'next/app'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config.js'
import { MantineProvider, MantineThemeOverride } from '@mantine/core'
import { AuthContext, AuthContextProvider } from '../state/AuthContext'
import { Header } from '../components/common/layout/Header'
import { useContext } from 'react'

const resolvedTailwindConfig = resolveConfig(tailwindConfig)

// Tailwind のブレイクポイントを Mantine 用に変換
const tailwindScreensForMantine: { [key: string]: number } = {}
const tailwindScreens = resolvedTailwindConfig.theme?.screens
if (tailwindScreens) {
  for (const [key, value] of Object.entries(tailwindScreens)) {
    // 末尾の px を削除してから数値に変換
    tailwindScreensForMantine[key] = Number(value.slice(0, -2))
  }
}

const theme: MantineThemeOverride = {
  breakpoints: tailwindScreensForMantine,
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider
    // useステートの管理処理がなされる
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </AuthContextProvider>
  )
}
