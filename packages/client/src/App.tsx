import React, {useEffect} from 'react'
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
import Forum from './pages/Forum/Main/index'
import CreateTopicPage from './pages/Forum/CreateTopic/index'
import Topic from './pages/Forum/Topic/index'
import ServerErrorPage from './pages/ServerError/500'
import {ErrorBoundary} from './components/ErrorBoundary/ErrorBoundary'

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
		<div
			className='App'
			tabIndex={0}>
			<ErrorBoundary>
				<BrowserRouter>
					<Routes>
						<Route element={<ProtectedRoute />}>
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
								path={'/forum'}
								element={<Forum />}
							/>
							<Route
								path={'/create-topic'}
								element={<CreateTopicPage />}
							/>
							<Route
								path={'/topic'}
								element={<Topic />}
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
							path={'/server-error'}
							element={<ServerErrorPage />}
						/>
						<Route
							path={'*'}
							element={<NotFoundPage />}
						/>
					</Routes>
				</BrowserRouter>
			</ErrorBoundary>
		</div>
	)
}

export default App
