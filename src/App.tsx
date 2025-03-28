import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login/Login'
import Admin from './pages/admin/Admin'
import Create from './pages/admin/createproducts/Create'
import Manage from './pages/admin/manageproducts/Manage'

function App() {
	return (
		<>
			<Login />
			<Routes>
				<Route path='login' element={<Login />} />
				{/* <Route path='protected-route' element={<ProtectedRoute />}> */}
				<Route path='admin' element={<Admin />}>
					<Route path='create-products' element={<Create />} />
					<Route path='manage-products' element={<Manage />} />
				</Route>
				{/* </Route> */}
			</Routes>
		</>
	)
}

export default App
