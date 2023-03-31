import { createGetInitialProps } from '@mantine/next'
import Document, { Head, Html, Main, NextScript } from 'next/document'

const getInitialProps = createGetInitialProps()

export default class _Document extends Document {
  static getInitialProps = getInitialProps

  render() {
    return (
      <Html>
        <Head />
        <body className="bg-gray-100 text-gray-800">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
