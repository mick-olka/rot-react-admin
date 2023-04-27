import axios from 'axios'

import { I_Locales } from '.'

import { I_ProductPopulated } from './products.service'

export interface I_Collection {
  _id: string
  name: I_Locales
  url_name: string
  items: I_ProductPopulated[]
  keywords: string[]
  description: I_Locales
  index: number
}

export interface I_CollectionDto {
  name: I_Locales
  url_name?: string
  items?: string[]
}

export interface I_CollectionItemsDto {
  items: string[]
  action: 'add' | 'delete'
}

export interface I_CollectionForm {
  name: I_Locales
  description: I_Locales
}

export const collectionsAPI = {
  async getAll() {
    return axios.get<I_Collection[]>('/collections')
  },
  async getById(id: string) {
    return axios.get<I_Collection>(`/collections/${id}`)
  },
  async create(data: I_CollectionDto) {
    return axios.post<I_Collection>(`/collections/`, data)
  },
  async update(id: string, data: Partial<I_CollectionDto>) {
    return axios.patch<I_Collection>(`/collections/${id}`, data)
  },
  async updateItems(id: string, data: I_CollectionItemsDto) {
    return axios.put<I_Collection>(`/collections/${id}`, data)
  },
  async delete(id: string) {
    return axios.delete<I_Collection>(`/collections/${id}`)
  },
  async deleteMany(ids: string[]) {
    return Promise.all(ids.map((id) => axios.delete<I_Collection>(`/collections/${id}`)))
  },
}
