import { db } from '@/firebase'
import { cn } from '@/lib/utils'
import { ITask, ITaskData } from '@/types'
import { QueryObserverResult } from '@tanstack/react-query'
import { doc, updateDoc } from 'firebase/firestore'
import { useState } from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi'
import { CiPause1, CiPlay1 } from 'react-icons/ci'
import { HiStatusOnline } from 'react-icons/hi'
import { MdOutlineTaskAlt } from 'react-icons/md'
import { useStopwatch } from 'react-timer-hook'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import FilLoading from './filling'

interface Props {
	task: ITask
	onStartEdit: () => void
	onDelete: () => void
	refetch: () => Promise<QueryObserverResult<ITaskData, Error>>
}

function TaskItem({ task, onStartEdit, onDelete, refetch }: Props) {
	const { seconds, minutes, hours, isRunning, start, pause } = useStopwatch({
		autoStart: false,
	})

	const [isLoading, setIsLoading] = useState(false)

	const onStart = async () => {
		setIsLoading(true)

		const ref = doc(db, 'tasks', task.id)
		try {
			await updateDoc(ref, {
				status: 'in_progress',
				startTime: Date.now(),
			})
			refetch()
		} catch (error) {
			toast.error('An error occured')
		} finally {
			setIsLoading(false)
		}
	}

	const resume = () => {
		if (!isRunning) {
			start()
		}
	}

	const onPause = async () => {
		setIsLoading(true)

		const ref = doc(db, 'tasks', task.id)
		try {
			const elapsed = task.startTime ? Date.now() - task.startTime : 0
			const newTotalTime = (task.totalTime || 0) + elapsed
			await updateDoc(ref, {
				status: 'paused',
				endTime: Date.now(),
				totalTime: newTotalTime,
			})
			refetch()
		} catch (error) {
			toast.error('An error occured')
		} finally {
			setIsLoading(false)
		}
	}

	const renderBtns = () => {
		switch (task.status) {
			case 'unstarted':
				return (
					<Button
						variant={'ghost'}
						size={'icon'}
						className='w-8 h-8'
						onClick={() => {
							onStart()
							start()
						}}
					>
						<CiPlay1 className='w-5 h-5 text-indigo-500' />
					</Button>
				)
			case 'in_progress':
				return (
					<Button
						variant={'ghost'}
						size={'icon'}
						className='w-8 h-8'
						onClick={() => {
							pause()
							onPause()
						}}
					>
						<CiPause1 className='w-5 h-5 text-indigo-500' />
					</Button>
				)
			case 'paused':
				return (
					<Button
						variant={'ghost'}
						size={'icon'}
						className='w-8 h-8'
						onClick={() => {
							onStart()
							resume()
						}}
					>
						<CiPlay1 className='w-5 h-5 text-indigo-500' />
					</Button>
				)
		}
	}

	return (
		<Card className='w-full p-4 shadow-md grid grid-cols-4 items-center relative'>
			{isLoading && <FilLoading />}
			<div className='flex flex-row gap-1 items-center col-span-2'>
				<div className='flex gap-2 items-start'>
					<MdOutlineTaskAlt className='text-blue-500' />
					<span
						className='capitalize overflow-hidden text-ellipsis whitespace-nowrap w-28'
						title={task.title}
					>
						{task.title}
					</span>
				</div>

				<div className='flex items-center mr-2'>
					<h3 className='text-muted-foreground text-xl'>
						{String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:
						{String(seconds).padStart(2, '0')}
					</h3>
				</div>
			</div>

			<div className='flex gap-1 items-center'>
				<HiStatusOnline
					className={cn(
						task.status == 'unstarted' && 'text-blue-500',
						task.status == 'in_progress' && 'text-green-500',
						task.status == 'paused' && 'text-red-500'
					)}
				/>
				<span className='capitalize text-sm'>{task.status}</span>
			</div>

			<div className='flex gap-2 items-center'>
				{renderBtns()}
				<Button
					variant={'secondary'}
					size={'icon'}
					className='w-8 h-8'
					onClick={onStartEdit}
				>
					<BiEdit className='w-5 h-5' />
				</Button>
				<Button
					variant={'destructive'}
					size={'icon'}
					className='w-8 h-8'
					onClick={onDelete}
				>
					<BiTrash className='w-5 h-5' />
				</Button>
			</div>
		</Card>
	)
}

export default TaskItem
