import { auth } from '@/firebase'
import { useUserState } from '@/stores/user-store'
import { ReactNode, useEffect, useState } from 'react'
import FilLoading from '../shared/filling'


function AuthProvider({children}: {children: ReactNode}) {
	const [isLoading, setIsLoading] = useState(true)

	const {setUser} = useUserState()

	useEffect(() => {
		auth.onAuthStateChanged(user => {
			user && setUser(user)
			setIsLoading(false)
		})
	}, [])

	return (
		isLoading ? <FilLoading /> : <>{children}</>
	)	
}

export default AuthProvider