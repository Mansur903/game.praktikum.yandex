import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'

function startServiceWorker() {
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', () => {
			navigator.serviceWorker
				.register('../sw.ts')
				.then((registration) => {
					console.log(
						'ServiceWorker registration successful with scope: ',
						registration.scope
					)
				})
				.catch((error) => {
					console.log('ServiceWorker registration failed: ', error)
				})
		})
	}
}

startServiceWorker()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
