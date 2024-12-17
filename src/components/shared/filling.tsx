
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { Skeleton } from '../ui/skeleton'


function FilLoading() {	
	return (
		<Skeleton className='absolute inset-0 flex justify-center items-center w-full h-full opacity-20 z-50'>
			<AiOutlineLoading3Quarters className='animate-spin animate-bounce' />			
		</Skeleton>
	)
}

export default FilLoading