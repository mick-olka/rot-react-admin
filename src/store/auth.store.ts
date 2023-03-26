import axios from 'axios'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { I_AuthResponseData } from 'src/services/auth.service'
import { LocalStorage } from 'src/utils/helpers/localStorage'

interface State {
  isAuth: boolean
}

interface Actions {
  authenticate: (tokens: I_AuthResponseData) => void
  logout: () => void
}

export const useAuthStore = create(
  // immer simplifies work with state
  persist(
    immer<State & Actions>((set) => ({
      isAuth: false,
      authenticate: (tokens) => {
        LocalStorage.setAuthToken(tokens.access_token)
        axios.defaults.headers.common = { Authorization: `Bearer ${tokens.access_token}` }
        set({ isAuth: true })
      },
      logout: () => {
        LocalStorage.deleteAuthToken()
        axios.defaults.headers.common = { Authorization: null }
        set({ isAuth: false })
      },
    })),
    { name: 'authStore', version: 1 },
  ),
)
