import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login/Login'
import ManageProducts from './pages/admin/manageproducts/Manage'
import Create from './pages/admin/createproducts/Create'
import Admin from './pages/admin/Admin'

const App: React.FC = () => (
	<Routes>
		<Route path='/login' element={<Login />} />
		<Route path='/admin' element={<Admin />}>
			<Route path='create-products' element={<Create />} />
			<Route path='manage-products' element={<ManageProducts />} />
		</Route>
		<Route path='*' element={<Navigate to='/login' replace />} />
	</Routes>
)

export default App
