import { navLinks } from '@/constants/const'
import { useUserState } from '@/stores/user-store'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { ModeToggle } from './mode-toggle'
import UserBox from './userBox'

function Navbar() {
	const { user } = useUserState()

	return (
		<div className='w-full h-[10vh] border-b fixed insert-0 z-50 bg-background'>
			<div className='container w-full mx-auto h-full flex justify-between items-center'>
				<Link to={'/'}>
					<h1 className='text-2xl md:text-xl font-bold uppercase cursor-pointer'>
						Workout
					</h1>
				</Link>

				<div className='flex items-center gap-4'>
					<div className='hidden lg:flex gap-2'>
						{navLinks.map(nav => (
							<Link
								to={nav.path}
								key={nav.path}
								className='font-medium hover:underline'
							>
								{nav.label}
							</Link>
						))}
					</div>
					<ModeToggle />
					{user ? (
						<UserBox />
					) : (
						<Link to={'/auth'} className=''>
							<Button variant={'secondary'}>Join Free</Button>
						</Link>
					)}

					<div className='md:flex lg:hidden'>
						<DropdownMenu>
							<DropdownMenuTrigger>Open</DropdownMenuTrigger>
							<DropdownMenuContent>
								{!user && (
									<DropdownMenuItem>
										<Link to={'/auth'} className='font-medium hover:underline'>
											Join Free
										</Link>
									</DropdownMenuItem>
								)}
								{navLinks.map(nav => (
									<DropdownMenuItem>
										<Link
											to={nav.path}
											key={nav.path}
											className='font-medium hover:underline'
										>
											{nav.label}
										</Link>
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Navbar
