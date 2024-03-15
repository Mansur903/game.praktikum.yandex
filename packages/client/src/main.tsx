import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import store from './store'
import {Provider} from 'react-redux'

ReactDOM.hydrateRoot(
	document.getElementById('root') as HTMLElement,
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
)
