import {useEffect} from 'react'
import {Route, Routes} from 'react-router-dom'
import './App.css'
import CreateTopicPage from './pages/Forum/CreateTopic/index'
import Forum from './pages/Forum/Main/index'
import Topic from './pages/Forum/Topic/index'
import Game from './pages/Game/Game'
import Leaderboard from './pages/Leaderboard'
import {Login} from './pages/Login/Login'
import MainPage from './pages/MainPage/MainPage'
import NotFoundPage from './pages/NotFound/404'
import Profile from './pages/Profile/Profile'
import Register from './pages/Register/Register'
import ProtectedRoute from './routing/ProtectedRoute'

const App = () => {
	// const handle = useFullScreenHandle()

	// const toggleFullScreen = useCallback(
	// 	(e: React.KeyboardEvent) => {
	// 		if (e.key === 'f') handle.active ? handle.exit() : handle.enter()
	// 	},
	// 	[handle.active]
	// )

	// useEffect(() => {
	// 	const fetchServerData = async () => {
	// 		const url = `http://localhost:${__SERVER_PORT__}/api`
	// 		const response = await fetch(url)
	// 		const data = await response.json()
	// 		console.log(data)
	// 	}

	// 	fetchServerData()
	// }, [])

	return (
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
			<Route
				path={'*'}
				element={<NotFoundPage />}
			/>
		</Routes>
	)
}

export default App
