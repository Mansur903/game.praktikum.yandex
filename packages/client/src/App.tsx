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
import {Login} from './pages/Login/Login'
import ProtectedRoute from './routing/ProtectedRoute'
import Forum from './pages/Forum/Main/index'
import CreateTopicPage from './pages/Forum/CreateTopic/index'
import Topic from './pages/Forum/Topic/index'
// import {useSelector} from 'react-redux'
import {useAppSelector} from './hooks'
import {selectUser} from './entities/user'

const App = () => {
	const user = useAppSelector((state) => state?.user?.data)

	return (
		<div>
			{user ? (
				<div>
					<p>{user.login}</p>
					{/*<p>{user.password}</p>*/}
				</div>
			) : (
				<p>Пользователь не найден!</p>
			)}
		</div>
	)
}

export default App
