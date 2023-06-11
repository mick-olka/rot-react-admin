import axios from 'axios'

import { I_Locales } from '.'

import { orders_page_limit } from 'src/utils/constants/constants'

interface I_ProductPopulated {
  _id: string
  name: I_Locales
  url_name: string
  thumbnail: string
  price: number
  old_price: number
}

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

interface I_OrdersResData {
  count: number
  docs: I_Order[]
}
export interface I_OrderForm {
  name: string
  phone: string
  message?: string
  status: StatusEnum
}

export const ordersAPI = {
  async getAll({ page, limit, regex }: { page?: number; limit?: number; regex?: string }) {
    let route = `/orders?page=${page || 1}&limit=${limit || orders_page_limit}`
    if (regex) route += `&regex=${regex}`
    return axios.get<I_OrdersResData>(route)
  },
  async getById(id: string) {
    return axios.get<I_OrderPopulated>(`/orders/${id}`)
  },
  async create(data: I_OrderDto) {
    return axios.post<I_Order>(`/orders/`, data)
  },
  async update(id: string, data: Partial<I_OrderDto>) {
    return axios.patch<I_Order>(`/orders/${id}`, data)
  },
  // async updateItems(id: string, data: I_OrderItemsDto) {
  //   return axios.put<I_Order>(`/orders/${id}`, data)
  // },
  async delete(id: string) {
    return axios.delete<I_Order>(`/orders/${id}`)
  },
  async deleteMany(ids: string[]) {
    return Promise.all(ids.map((id) => axios.delete<I_Order>(`/orders/${id}`)))
  },
}
