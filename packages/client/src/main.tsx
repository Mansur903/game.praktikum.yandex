import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import store from './store/store'
import {Provider} from 'react-redux'
import {routes} from '../routes'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {ThemeSwitch} from './components/ThemeSwitch/ThemeSwitch'

const router = createBrowserRouter(routes)

ReactDOM.hydrateRoot(
	document.getElementById('root') as HTMLElement,
	<React.StrictMode>
		<Provider store={store}>
			<ThemeSwitch>
				<RouterProvider router={router} />
			</ThemeSwitch>
		</Provider>
	</React.StrictMode>
)
