import axios from 'axios'

import { I_Order, I_OrderDto, I_OrderPopulated, I_OrdersResData } from 'src/models'
import { orders_page_limit } from 'src/utils/constants'

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
