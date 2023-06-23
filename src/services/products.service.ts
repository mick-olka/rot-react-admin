import axios from 'axios'

import { I_Product, I_ProductDto, I_ProductItemsDto, I_ProductsResData } from 'src/models'
import { products_page_limit, getFormData } from 'src/utils'

export const productsAPI = {
  async getAll({ page, limit, regex }: { page?: number; limit?: number; regex?: string }) {
    let route = `/products?page=${page || 1}&limit=${limit || products_page_limit}`
    if (regex) route += `&regex=${regex}`
    return axios.get<I_ProductsResData>(route)
  },
  async getById(id: string) {
    return axios.get<I_Product>(`/products/${id}`)
  },
  async create(data: I_ProductDto) {
    const formData = getFormData(data)
    return axios.post<I_Product>(`/products/`, formData)
  },
  async update(id: string, data: Partial<I_ProductDto>) {
    const formData = getFormData(data)
    return axios.patch<I_Product>(`/products/${id}`, formData)
  },
  async updateItems(id: string, data: I_ProductItemsDto) {
    return axios.put<I_Product>(`/products/${id}`, data)
  },
  async delete(id: string) {
    return axios.delete<I_Product>(`/products/${id}`)
  },
  async deleteMany(ids: string[]) {
    return Promise.all(ids.map((id) => axios.delete<I_Product>(`/products/${id}`)))
  },
}
