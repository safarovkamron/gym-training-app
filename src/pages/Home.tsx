import men from '@/assets/men.png'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { featuredItems, programs } from '@/constants/const'
import { useUserState } from '@/stores/user-store'
import { FaArrowRightLong, FaDumbbell } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

function Home() {
	const { user } = useUserState()

	return (
		<>
			<div className=' h-screen flex items-center bg-background justify-center'>
				<div className='max-w-[50%] flex h-full flex-col justify-center'>
					<h1 className='md:text-6xl lg:text-9xl  font-semibold uppercase'>
						Workout with me
					</h1>
					<p className='text-muted-foreground'>
						A huge selection of health and fitness content, healthyy recipes and
						transformation stories to help you get fir and stay fit!
					</p>
					{user ? (
						<Link to={'/dashboard'}>
							<Button className='w-fit mt-6 font-bold h-12' size={'lg'}>
								<span>Go to GYM</span>
								<FaDumbbell className='h-5 w-5 ml-2 transform rotate-45' />
							</Button>
						</Link>
					) : (
						<Link to={'/auth'} className='w-fit'>
							<Button className='w-fit mt-6 font-bold h-12' size={'lg'}>
								Join club now
							</Button>
						</Link>
					)}

					<div className='mt-24'>
						<p className='text-muted-foreground'>AS FEATURED IN</p>
						<div className='flex items-center gap-4 mt-2'>
							{featuredItems.map((Icon, index) => (
								<Icon key={index} className='w-12 h-12' />
							))}
						</div>
					</div>
				</div>

				<img src={men} className='hidden max-w-1/3 ml-2 md:flex mt-10' />
			</div>

			<div className='w-full flex flex-col items-center'>
				<h1 className='text-4xl'>Not sure where to start?</h1>
				<p className='mt-2 text0muted-foreground'>
					Programs offer day-to-day guidance on an interactive calendar to keep
					you on track.
				</p>
				<div className='grid grid-cols-3 gap-4 my-8'>
					{programs.map(item => (
						<Card
							key={item.title}
							className='p-8 relative cursor-pointer group'
						>
							<h3 className=''>{item.title}</h3>
							<p className='text-ms text-muted-foreground mt-2'>
								{item.description}
							</p>
							<Button
								size={'icon'}
								variant={'ghost'}
								className='absolute right-2 top-1/2 group-hover:translate-x-1 transition-transform'
							>
								<FaArrowRightLong />
							</Button>
						</Card>
					))}
				</div>
			</div>
		</>
	)
}

export default Home
