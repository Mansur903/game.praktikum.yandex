import {useEffect} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import Game from './pages/Game/Game'
import MainPage from './pages/MainPage/MainPage'
import NotFoundPage from './pages/NotFound/404'
import Leaderboard from './pages/Leaderboard'
import Profile from './pages/Profile/Profile'

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
						element={<MainPage />}
					/>
					<Route
						path={'/game'}
						element={<Game />}
					/>
					<Route
						path={'/profile'}
						element={<Profile />}
					/>
					<Route
						path={'/leaderboard'}
						element={<Leaderboard />}
					/>
					<Route
						path={'*'}
						element={<NotFoundPage />}
					/>
<<<<<<< HEAD
=======
					<Route
						path={'/game'}
						element={<Game />}
					/>
>>>>>>> 9a2a628 (feat: ad game end state)
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
