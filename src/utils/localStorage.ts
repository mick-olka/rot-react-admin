export const LocalStorage = {
  setAuthToken: (token: string) => localStorage.setItem('authToken', token),
  getAuthToken: () => localStorage.getItem('authToken'),
  deleteAuthToken: () => localStorage.removeItem('authToken'),
}
