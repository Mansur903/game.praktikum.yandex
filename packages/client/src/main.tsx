import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import store from './store/store'
import {Provider} from 'react-redux'
import {routes} from '../routes'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {Switch} from './components/Switch/Switch'

const router = createBrowserRouter(routes)

ReactDOM.hydrateRoot(
	document.getElementById('root') as HTMLElement,
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
			<div className='switch'>
				<Switch />
			</div>
		</Provider>
	</React.StrictMode>
)
