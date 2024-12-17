import { auth } from '@/firebase'
import {
	GithubAuthProvider,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth'
import { useState } from 'react'
import { FaGithub, FaGoogle } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import FilLoading from '../shared/filling'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

function Social() {
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()

	const onGoogle = () => {
		setIsLoading(true)
		const googleProvired = new GoogleAuthProvider()
		signInWithPopup(auth, googleProvired)
			.then(() => {
				navigate('/')
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	const onGithub = () => {
		setIsLoading(true)
		const GithubProvired = new GithubAuthProvider()
		signInWithPopup(auth, GithubProvired)
			.then(() => {
				navigate('/')
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	return (
		<>
			{isLoading && <FilLoading />}
			<Separator className='my-3' />
			<div className='grid grid-cols-2 gap-2'>
				<Button variant={'secondary'} disabled={isLoading} onClick={onGithub}>
					<FaGithub />
					<span className='ml-2'>Sign in with Github</span>
				</Button>
				<Button
					variant={'destructive'}
					className='ml-2'
					disabled={isLoading}
					onClick={onGoogle}
				>
					<FaGoogle />
					<span className='ml-2'>Sign in with Google</span>
				</Button>
			</div>
		</>
	)
}

export default Social
