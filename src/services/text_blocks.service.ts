import axios from 'axios'

import { I_TextBlock, I_TextBlockDto } from 'src/models'

export const textBlocksAPI = {
  async getAll() {
    return axios.get<I_TextBlock[]>('/text_blocks')
  },
  async getById(id: string) {
    return axios.get<I_TextBlock>(`/text_blocks/${id}`)
  },
  async create(data: I_TextBlockDto) {
    return axios.post<I_TextBlock>(`/text_blocks/`, data)
  },
  async update(id: string, data: Partial<I_TextBlockDto>) {
    return axios.patch<I_TextBlock>(`/text_blocks/${id}`, data)
  },
  async delete(id: string) {
    return axios.delete<I_TextBlock>(`/text_blocks/${id}`)
  },
  async deleteMany(ids: string[]) {
    return Promise.all(ids.map((id) => axios.delete<I_TextBlock>(`/text_blocks/${id}`)))
  },
}
