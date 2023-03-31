export type ExhibitFormType = {
  status: string
  productName: string
  description: string
  deliveryCharge: string
  shippingMethod: string
  area: string
  shippingDate: string
  sellingPrice: number
  ProductImg: string
}

export type AuthForm = {
  firstName: string
  lastName: string
  email: string
  password: string
  city: string
}
export type Post = {
  id: number
  created_at: string
  title: string
  content: string
  post_url: string
  status: string
}

export type Point = {
  point: number
}
