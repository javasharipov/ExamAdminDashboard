import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { FaSignOutAlt } from 'react-icons/fa'
import createProductImage from '../../assets/create.svg'
import manageProductImage from '../../assets/manage.svg'
import { Toaster } from 'react-hot-toast'

const Admin = () => {
	const location = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		if (!localStorage.getItem('access_token')) {
			navigate('/login', { replace: true })
		}
	}, [navigate])

	const handleLogout = () => {
		localStorage.removeItem('access_token')
		navigate('/login', { replace: true })
	}

	return (
		<div className=''>
			<Toaster position='top-right' reverseOrder={false} />
			<div className='h-screen w-[400px] bg-[#454545] text-white p-6 flex flex-col fixed '>
				<div className='mb-8'>
					<h1 className='text-2xl font-bold mb-2'>Admin Dashboard</h1>
				</div>

				<nav className='space-y-4'>
					<div>
						<Link
							to='/admin/create-products'
							className={`flex items-center gap-3 p-3 rounded transition-colors ${
								location.pathname === '/admin/create-products'
									? 'bg-[#ffffff46]'
									: 'hover:bg-[#5a5a5a]'
							}`}
						>
							<img
								src={createProductImage}
								alt='Create product'
								className='w-6 h-6'
							/>
							<span>Create product</span>
						</Link>
					</div>

					<div>
						<Link
							to='/admin/manage-products'
							className={`flex items-center gap-3 p-3 rounded transition-colors ${
								location.pathname === '/admin/manage-products'
									? 'bg-[#ffffff46]'
									: 'hover:bg-[#5a5a5a]'
							}`}
						>
							<img
								src={manageProductImage}
								alt='Manage product'
								className='w-6 h-6'
							/>
							<span>Manage product</span>
						</Link>
					</div>
				</nav>

				<button
					onClick={handleLogout}
					className='flex items-center gap-2 p-3 rounded hover:bg-[#5a5a5a]  mt-auto transition-colors'
				>
					<FaSignOutAlt />
					<span>Log out</span>
				</button>
			</div>
			<div className='ml-[430px]'>
				<Outlet />
			</div>
		</div>
	)
}

export default Admin
