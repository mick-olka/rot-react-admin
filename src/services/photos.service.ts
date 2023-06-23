import axios from 'axios'

import { I_Photos, I_PhotosDto } from 'src/models'

import { getFormData } from 'src/utils'

export const photosAPI = {
  async getAll() {
    return axios.get<I_Photos[]>(`/photos/`)
  },
  async getById(id: string) {
    return axios.get<I_Photos>(`/photos/${id}`)
  },
  async create(product_id: string, data: I_PhotosDto) {
    const formData = getFormData(data)
    return axios.post<I_Photos>(`/photos?product_id=${product_id}`, formData)
  },
  async update(id: string, data: Partial<I_PhotosDto>) {
    const formData = getFormData(data)
    return axios.patch<I_Photos>(`/photos/${id}`, formData)
  },
  async delete(id: string, product_id: string) {
    return axios.delete<I_Photos>(`/photos/${id}?product_id=${product_id}`)
  },
  async deletePhoto(group_id: string, filename: string) {
    return axios.delete<I_Photos>(`/photos/photo/${group_id}?filename=${filename}`)
  },
}
