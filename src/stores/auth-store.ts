import { create } from 'zustand'

type authStateType = 'login' | 'register'

interface IAuthStateStore {
	authState: authStateType
	setAuth: (state: authStateType) => void
}

export const useAuthState = create<IAuthStateStore>((set) => ({
	authState: 'login',
	setAuth: state => set({authState: state})
}))