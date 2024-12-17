import { Input } from '@/components/ui/input'
import { auth } from '@/firebase'
import { registerSchema } from '@/lib/validation'
import { useAuthState } from '@/stores/auth-store'
import { useUserState } from '@/stores/user-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BiError } from "react-icons/bi"
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import FilLoading from '../shared/filling'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Separator } from '../ui/separator'

function Register() {
	const {setAuth} = useAuthState()

	const {setUser} = useUserState()

	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const navigate = useNavigate()

	const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      Email: "",
			password: "",
			confirmPassword: ''
    },
  })

	const onSubmit = async (values: z.infer<typeof registerSchema>) => {
		const {Email, password} = values
		setIsLoading(true)
		try{
			const res = await createUserWithEmailAndPassword(auth, Email, password)
			setUser(res.user)
			navigate('/')	
		} catch(error) {
			const result = error as Error
			setError(result.message)
		} finally {
			setIsLoading(false)
		}
	}


	return (
		<div className='flex flex-col'>
			{isLoading && <FilLoading />}
			<h2 className='text-xl font-bold'>Register</h2>
			<p className='text-muted-foreground my-2'>
				Already have an account? {' '}
				<span 
					className='text-blue-500 cursor-pointer transition-all hover:underline '
					onClick={ () => setAuth('login')}
				>
					Sign in
				</span>
			</p>
			<Separator />
			{error && 
				<Alert variant={'destructive'}>
					<BiError className="h-4 w-4" />
					<AlertTitle >Heads up!</AlertTitle>
					<AlertDescription>
						{error}
					</AlertDescription>
				</Alert>
			}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
					<FormField
						control={form.control}
						name="Email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email adress</FormLabel>
								<FormControl>
									<Input placeholder="example@gmail.com" disabled={isLoading} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='grid gtid-col-2 gap-4'>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input placeholder="********" type='password' disabled={isLoading} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<Input placeholder="********" type='password' disabled={isLoading} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div>
						<Button type="submit" className='h-12 w-full mt-2' disabled={isLoading} >Submit</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}

export default Register