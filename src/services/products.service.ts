import axios from 'axios'

import { I_Locales, E_Languages } from '.'

import { I_Photos } from './photos.service'

import { products_page_limit } from 'src/utils/constants/constants'
import { getFormData } from 'src/utils/helpers/utils'

export type I_ProductFeatures = {
  [key in E_Languages]: [
    {
      key: string
      value: string
    },
  ]
}

interface I_ProductPopulated {
  _id: string
  name: I_Locales
  url_name: string
  thumbnail: string
  price: number
  old_price: number
}

export interface I_Product {
  _id: string
  name: I_Locales
  url_name: string
  code: string
  price: number
  oldPrice: number
  thumbnail: string
  keywords: string[]
  description: I_Locales
  features: I_ProductFeatures
  photos: I_Photos[]
  related_products: I_ProductPopulated[]
  similar_products: I_ProductPopulated[]
}

interface I_ProductsResData {
  count: number
  docs: I_Product[]
}

export interface I_ProductForm {
  name: I_Locales
  code: string
  price: number
}

export interface I_ProductDto {
  name: I_Locales
  code: string
  price: number
  thumbnail?: File
}

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
  async delete(id: string) {
    return axios.delete<I_Product>(`/products/${id}`)
  },
  async deleteMany(ids: string[]) {
    return Promise.all(ids.map((id) => axios.delete<I_Product>(`/products/${id}`)))
  },
}
