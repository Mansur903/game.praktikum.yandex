import {useEffect, useState} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import Register from './pages/Register/Register'
import Game from './pages/Game/Game'
import MainPage from './pages/MainPage/MainPage'
import NotFoundPage from './pages/NotFound/404'
import Leaderboard from './pages/Leaderboard'
import Profile from './pages/Profile/Profile'
import {Login} from './pages/Login/Login'
import ProtectedRoute from './routing/ProtectedRoute'
import axios from 'axios'

const App = () => {
	const [status, setStatus] = useState(0)
	useEffect(() => {
		axios
			.get('https://ya-praktikum.tech/api/v2/auth/user', {withCredentials: true})
			.then((res) => {
				setStatus(res.status)
			})
			.catch((e) => setStatus(e.response.status))
	}, [])
	useEffect(() => {
		const fetchServerData = async () => {
			const url = `http://localhost:${__SERVER_PORT__}`
			const response = await fetch(url)
			const data = await response.json()
			console.log(data)
		}

		fetchServerData()
	}, [])

	if (!status) {
		return <div>loading...</div>
	}

	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route element={<ProtectedRoute status={status} />}>
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
							path={'/game'}
							element={<Game />}
						/>
					</Route>
					<Route
						path={'/signup'}
						element={<Register />}
					/>
					<Route
						path={'/signin'}
						element={<Login />}
					/>
					<Route
						path={'*'}
						element={<NotFoundPage />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
