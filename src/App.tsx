import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import Navbar from './components/shared/Navbar'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'

function App() {
	return (
		<>
			<Navbar />
			<div className='w-full'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/auth' element={<Auth />} />
					<Route path='/dashboard' element={<Dashboard />} />
				</Routes>
				<Toaster position='top-center' />
			</div>
		</>
	)
}

export default App
