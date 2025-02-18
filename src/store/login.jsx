import { create } from 'zustand'

export const useLogin = create((set) => ({
    isLoggedIn: false,
    setLogin: () => set({ isLoggedIn: true }),
    setLogout: () => set({ isLoggedIn: false }),
}))