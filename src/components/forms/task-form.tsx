import { taskSchema } from '@/lib/validation'
import { useUserState } from '@/stores/user-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import FilLoading from '../shared/filling'
import SpeechToText from '../shared/speech-to-text'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

interface Props {
	title?: string
	isEdit?: boolean
	openDialog?: boolean
	onClose?: () => void
	handler: (values: z.infer<typeof taskSchema>) => Promise<void | null>
}

function TaskForm({ title = '', handler, openDialog, isEdit, onClose }: Props) {
	const [isLoading, setIsLoading] = useState(false)
	const { user } = useUserState()

	const form = useForm<z.infer<typeof taskSchema>>({
		resolver: zodResolver(taskSchema),
		defaultValues: { title },
	})

	const onSubmit = async (values: z.infer<typeof taskSchema>) => {
		inputRef.current?.value ? (values.title = inputRef.current?.value) : ''
		setIsLoading(true)

		if (!user) return null

		const promise = handler(values).finally(() => setIsLoading(false))

		toast.promise(promise, {
			loading: 'Loading...',
			success: 'Success',
			error: 'Something went wrong!',
		})
	}

	const inputRef = useRef<HTMLInputElement>(null)

	return (
		<>
			{isLoading && <FilLoading />}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<div className='flex items-center gap-2'>
										<Input
											placeholder='Enter a task'
											disabled={isLoading}
											{...field}
											ref={inputRef}
											className='bg-background border-solid border-indigo-900'
										/>
										<SpeechToText refInput={inputRef} />
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='flex justify-end'>
						{openDialog && (
							<Button
								type='submit'
								className='h-8 w-full mt-2 font-bold'
								disabled={isLoading}
							>
								Add Task
							</Button>
						)}
						{isEdit && (
							<>
								<Button
									type='button'
									variant={'destructive'}
									className='h-8 w-min mt-2 font-bold'
									disabled={isLoading}
									onClick={onClose}
								>
									Cancel
								</Button>
								<Button
									type='submit'
									className='h-8 w-min mt-2 ml-2 font-bold'
									disabled={isLoading}
								>
									Update
								</Button>
							</>
						)}
					</div>
				</form>
			</Form>
		</>
	)
}

export default TaskForm
