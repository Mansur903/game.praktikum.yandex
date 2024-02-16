import {useEffect} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import FirstComponent from './components/FirstComponent'
import Game from './pages/Game'

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
						path={'*'}
						element={<div>error404</div>}
					/>
					<Route
						path={'/game'}
						element={<Game />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
