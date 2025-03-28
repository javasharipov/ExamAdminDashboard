import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const navigate = useNavigate()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (username === 'john32' && password === '12345678j') {
			localStorage.setItem(
				'access_token',
				'yascdscvddvvdvregrtfdsxacsvfdrtgfsac'
			)
			setIsLoggedIn(true)
			navigate('/admin/create-products', { replace: true })
		} else {
			setError('Invalid username or password')
		}
	}

	if (isLoggedIn || localStorage.getItem('access_token')) {
		return null
	}

	return (
		<div className='flex justify-center items-center my-[17%]'>
			<div className='w-[400px] h-[320px] border border-[#ddd] rounded-[12px] py-[25px] px-[30px]'>
				<h2 className='text-[26px] font-medium'>Admin Login</h2>
				<form
					className='flex flex-col items-center justify-center gap-5 mt-[32px]'
					onSubmit={handleSubmit}
				>
					<input
						autoComplete='off'
						placeholder='Username'
						className='border border-[#ddd] w-[340px] h-[40px] rounded-[8px] px-2 py-0.5'
						type='text'
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>
					<input
						autoComplete='off'
						placeholder='Password'
						className='border border-[#ddd] w-[340px] h-[40px] rounded-[8px] px-2 py-0.5'
						type='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					{error && <p className='text-red-500 text-sm'>{error}</p>}
					<button
						type='submit'
						className='text-[16px] text-[#fff] w-[340px] h-[40px] rounded-[8px] bg-[#454545] cursor-pointer'
					>
						Sign in
					</button>
				</form>
			</div>
		</div>
	)
}

export default React.memo(Login)
