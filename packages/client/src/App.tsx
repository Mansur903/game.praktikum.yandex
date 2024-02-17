import {useEffect} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import FirstComponent from './components/FirstComponent'
import Register from './pages/Register/Register'

const App = () => {
	useEffect(() => {
		const fetchServerData = async () => {
			const url = `http://localhost:${__SERVER_PORT__}`
			const response = await fetch(url)
			const data = await response.json()
			console.log(data)
		}

		fetchServerData()
	}, [])
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route
						path={'/'}
						element={<FirstComponent />}
					/>
					<Route
						path={'/signup'}
						element={<Register />}
					/>
					<Route
						path={'*'}
						element={<div>error404</div>}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
