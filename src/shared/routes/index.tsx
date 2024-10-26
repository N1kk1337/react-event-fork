import { createBrowserRouter } from 'react-router-dom'
import Main from '~/pages/main'
import TestPage from '~/pages/test'
import Login from '~/pages/login'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Main />
	},
	{
		path: '/test',
		element: <TestPage />
	},
	{
		path: '/login',
		element: <Login />
	}
])
