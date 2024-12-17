import Login from '@/components/auth/login'
import Register from '@/components/auth/register'
import Social from '@/components/auth/social'
import { Card } from '@/components/ui/card'
import { useAuthState } from '@/stores/auth-store'

function Auth() {
	const {authState} = useAuthState()
	return (
		<div className='w-full h-screen bg-gradient-to-t from-muted-foreground to-background flex items-center justify-center'>
			<div className='relative lg:w-1/3 md:w-1/2 w-full px-2'>
				<div className='absolute -inset-1 bg-foreground rounded-lg blur-md'></div>
				<Card className='p-8 w-full relative'>
						{authState === 'login' && <Login />}
						{authState === 'register' && <Register />}
						<Social />
				</Card>
			</div>
		</div>
	)
}

export default Auth