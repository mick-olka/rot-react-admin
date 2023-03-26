import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface State {
  page: number
  product_id: string | null
}

interface Actions {
  setPage: (page: number) => void
  setProductId: (id: string) => void
}

export const useProductsStore = create(
  // immer simplifies work with state
  persist(
    immer<State & Actions>((set) => ({
      page: 1,
      product_id: null,
      setPage: (page) => {
        set({ page: page })
      },
      setProductId: (id) => {
        set({ product_id: id })
      },
    })),
    { name: 'productsStore', version: 1 },
  ),
)
