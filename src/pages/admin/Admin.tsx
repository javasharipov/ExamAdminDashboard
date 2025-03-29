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

	const navItems = [
		{
			path: '/admin/create-products',
			label: 'Create product',
			img: createProductImage,
		},
		{
			path: '/admin/manage-products',
			label: 'Manage product',
			img: manageProductImage,
		},
	]

	return (
		<div className='flex'>
			<Toaster position='top-right' reverseOrder={false} />
			<aside className='h-screen w-[400px] bg-[#454545] text-white p-6 flex flex-col fixed'>
				<h1 className='text-2xl font-bold mb-8'>Admin Dashboard</h1>
				<nav className='space-y-4'>
					{navItems.map(({ path, label, img }) => (
						<Link
							key={path}
							to={path}
							className={`flex items-center gap-3 p-3 rounded transition-colors ${
								location.pathname === path
									? 'bg-[#ffffff46]'
									: 'hover:bg-[#5a5a5a]'
							}`}
						>
							<img src={img} alt={label} className='w-6 h-6' />
							<span>{label}</span>
						</Link>
					))}
				</nav>
				<button
					onClick={handleLogout}
					className='flex items-center gap-2 p-3 rounded hover:bg-[#5a5a5a] mt-auto transition-colors'
				>
					<FaSignOutAlt />
					<span>Log out</span>
				</button>
			</aside>
			<main className='ml-[430px] w-full'>
				<Outlet />
			</main>
		</div>
	)
}

export default Admin
