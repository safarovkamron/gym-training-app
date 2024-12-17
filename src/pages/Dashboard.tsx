import TaskForm from '@/components/forms/task-form'
import FilLoading from '@/components/shared/filling'
import TaskItem from '@/components/shared/task-items'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { db } from '@/firebase'
import { taskSchema } from '@/lib/validation'
import { TaskService } from '@/service/task.service'
import { useUserState } from '@/stores/user-store'
import { ITask } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { addMilliseconds, addMinutes, format } from 'date-fns'
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	updateDoc,
} from 'firebase/firestore'
import { useState } from 'react'
import { BiError } from 'react-icons/bi'
import { BsPlusCircleFill } from 'react-icons/bs'
import { toast } from 'sonner'
import { z } from 'zod'

const Dashboard = () => {
	const [isEdit, setIsEdit] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)
	const [currentTask, setCurrentTask] = useState<ITask | null>(null)
	const [open, setOpen] = useState(false)

	const { user } = useUserState()

	const { isPending, error, data, refetch } = useQuery({
		queryKey: ['task-data'],
		queryFn: TaskService.getTasks,
	})

	const onAdd = async ({ title }: z.infer<typeof taskSchema>) => {
		if (!user) return null

		return addDoc(collection(db, 'tasks'), {
			title,
			status: 'unstarted',
			startTime: null,
			endTime: null,
			userId: user.uid,
		})
			.then(() => refetch())
			.finally(() => setOpen(false))
	}

	const onStartEdit = (task: ITask) => {
		setIsEdit(true)
		setCurrentTask(task)
	}

	const onUpdate = async ({ title }: z.infer<typeof taskSchema>) => {
		if (!user) return null
		if (!currentTask) return null

		const ref = doc(db, 'tasks', currentTask.id)

		return updateDoc(ref, { title })
			.then(() => refetch())
			.finally(() => setIsEdit(false))
	}

	const onDelete = async (id: string) => {
		setIsDeleting(true)

		const promise = deleteDoc(doc(db, 'tasks', id))
			.then(() => refetch())
			.finally(() => setIsDeleting(false))

		toast.promise(promise, {
			loading: 'Loading...',
			success: 'Deleted!',
			error: 'Something went wrong!',
		})
	}

	const formatDate = (time: number) => {
		const date = addMilliseconds(new Date(0), time)
		const formattedDate = format(
			addMinutes(date, date.getTimezoneOffset()),
			'hh:mm:ss'
		)
		return formattedDate
	}

	return (
		<>
			<div className='h-screen max-w-6xl mx-auto flex items-center max-md:pt-[5vh]'>
				<div className='w-full grid lg:grid-cols-2 grid-cols-1 gap-8 items-center'>
					<div className='w-full flex flex-col justify-center space-y-3'>
						<div className='w-full p-4 rounded-md flex justify-between bg-gradient-to-t from-slate-700 to-secondary'>
							<div className='text-2xl font-bold'>Trainings</div>
							<Button
								size={'icon'}
								variant={'outline'}
								onClick={() => setOpen(true)}
							>
								<BsPlusCircleFill className='w-5 h-5' />
							</Button>
						</div>

						<Separator />

						<div className='w-full p-4 rounded-md flex justify-between bg-gradient-to-b from-slate-800 to-secondary relative min-h-60'>
							{isPending || (isDeleting && <FilLoading />)}
							{error && (
								<Alert variant={'destructive'} className='w-full h-fit'>
									<BiError className='h-4 w-4' />
									<AlertTitle>Heads up!</AlertTitle>
									<AlertDescription>{error.message}</AlertDescription>
								</Alert>
							)}
							{data && (
								<ScrollArea className='h-full w-full rounded-md border p-2 flex flex-col space-y-3 max-h-96'>
									{!isEdit &&
										data.tasks.map(task => (
											<TaskItem
												key={task.id}
												task={task}
												onStartEdit={() => onStartEdit(task)}
												onDelete={() => onDelete(task.id)}
												refetch={refetch}
											/>
										))}
									{isEdit && (
										<div className='mt-2 px-2'>
											<TaskForm
												title={currentTask?.title}
												isEdit
												onClose={() => setIsEdit(false)}
												handler={
													onUpdate as (
														values: z.infer<typeof taskSchema>
													) => Promise<void | null>
												}
											/>
										</div>
									)}
								</ScrollArea>
							)}
						</div>
					</div>
					<div className='flex flex-col space-y-3 w-full'>
						<div className='p-4 rounded-md bg-gradient-to-tr from-red-600 to-background relative h-24'>
							<div className='text-2xl font-bold'>Total month</div>
							{isPending ? (
								<FilLoading />
							) : (
								data && (
									<>
										<div className='text-3xl'>{formatDate(data.weekTotal)}</div>
									</>
								)
							)}
						</div>
						<div className='p-4 rounded-md bg-gradient-to-tr from-green-600 to-background relative h-24'>
							<div className='text-2xl font-bold'>Total week</div>
							{isPending ? (
								<FilLoading />
							) : (
								data && (
									<>
										<div className='text-3xl'>
											{formatDate(data?.monthTotal)}
										</div>
									</>
								)
							)}
						</div>
						<div className='p-4 rounded-md bg-gradient-to-tr from-yellow-500 to-background relative h-24'>
							<div className='text-2xl font-bold'>Total</div>
							{isPending ? (
								<FilLoading />
							) : (
								data && (
									<>
										<div className='text-3xl'>{formatDate(data?.total)}</div>
									</>
								)
							)}
						</div>
					</div>
				</div>
			</div>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger></DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create a new task</DialogTitle>
					</DialogHeader>
					<Separator />
					<TaskForm
						handler={
							onAdd as (
								values: z.infer<typeof taskSchema>
							) => Promise<void | null>
						}
						openDialog={open}
					/>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default Dashboard
