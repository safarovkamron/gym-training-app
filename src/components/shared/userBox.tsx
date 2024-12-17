import { auth } from '@/firebase'
import { useUserState } from '@/stores/user-store'
import { BiLoader, BiLogOut } from 'react-icons/bi'
import { FaDumbbell } from "react-icons/fa6"
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'

function UserBox() {
	const {user, setUser} = useUserState()

	const navigate = useNavigate()

	const onLogout = () => {
		auth.signOut().then( () => {
			setUser(null)
			navigate('/auth')
		})
	}

	if(!user) return <BiLoader className='animate-spin'/>

	return (
		<DropdownMenu>

			<DropdownMenuTrigger asChild>
				<Avatar className='cursor-pointer'>
					<AvatarImage src={user.photoURL!} />
					<AvatarFallback className='uppercase'>{user.email![0]}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>

			<DropdownMenuContent 
				className='w-80'
				align='start'
				alignOffset={11}
				forceMount
			>
				<div className="flex flex-col space-y-4 p-2 ">
					<p className='text-xs font-medium leading-none text-muted-foreground'>
						{user.email}
					</p>

					<div className='flex items-center gap-x-2'>
						<div className='rounded-md bg-secondary p-1'>
							<Avatar>
								<AvatarImage src={user.photoURL!} />
								<AvatarFallback className='uppercase'>{user.email![0]}</AvatarFallback>
							</Avatar>
						</div>

						<div className='space-y-1'>
							<p className='line-clamp-1'>{user.displayName ?? user.email}</p>
						</div>

					</div>
				</div>
				<DropdownMenuSeparator />

				<DropdownMenuGroup>
					<DropdownMenuItem className='cursor-pointer my-2' onClick={() => navigate('/dashboard')}>
						<FaDumbbell className='w-4 h-4 mr-2'/>
						<span>Gym</span>
					</DropdownMenuItem>
					<DropdownMenuItem className='cursor-pointer bg-destructive my-2' onClick={onLogout}>
						<BiLogOut className='w-4 h-4 mr-2'/>
						<span>Logout</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>

			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserBox