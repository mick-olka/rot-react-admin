import { I_ProductPopulated } from '.'

// export interface I_OrderPopulated {
//   _id: string
//   name: I_Locales
//   url_name: string
//   thumbnail: string
//   price: number
//   old_price: number
// }

export enum StatusEnum {
  c = 'cancelled',
  d = 'done',
  w = 'waiting',
  p = 'in progress',
}

export interface I_CartItem {
  _id: string
  product: string
  count: number
  main_color: string
  pill_color: string
}

export interface I_CartItemPopulated extends Omit<I_CartItem, 'product'> {
  product: I_ProductPopulated
}

export interface I_Order {
  _id: string
  name: string
  phone: string
  message?: string
  cart: I_CartItem[]
  sum: number
  status: StatusEnum
  date: Date
}

export interface I_OrderPopulated extends Omit<I_Order, 'cart'> {
  cart: I_CartItemPopulated[]
}

export interface I_OrderDto {
  name: string
  phone: string
  message?: string
  cart: Omit<I_CartItem, '_id'>[]
  sum: number
  status: StatusEnum
}

export interface I_OrdersResData {
  count: number
  docs: I_Order[]
}
export interface I_OrderForm {
  name: string
  phone: string
  message?: string
  status: StatusEnum
}
