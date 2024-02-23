import React, {useEffect, useCallback} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {FullScreen, useFullScreenHandle} from 'react-full-screen'
import './App.css'
import Register from './pages/Register/Register'
import Game from './pages/Game/Game'
import MainPage from './pages/MainPage/MainPage'
import NotFoundPage from './pages/NotFound/404'
import Leaderboard from './pages/Leaderboard'
import Profile from './pages/Profile/Profile'

const App = () => {
	const handle = useFullScreenHandle()

	const toggleFullScreen = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === 'f') handle.active ? handle.exit() : handle.enter()
		},
		[handle.active]
	)

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
		<FullScreen handle={handle}>
			<div
				className='App'
				tabIndex={0}
				onKeyDown={toggleFullScreen}>
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
							path={'/signup'}
							element={<Register />}
						/>
						<Route
							path={'*'}
							element={<NotFoundPage />}
						/>
						<Route
							path={'/game'}
							element={<Game />}
						/>
					</Routes>
				</BrowserRouter>
			</div>
		</FullScreen>
	)
}

export default App
