import axios from 'axios'

import { I_Collection, I_CollectionDto, I_CollectionItemsDto } from 'src/models'

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
