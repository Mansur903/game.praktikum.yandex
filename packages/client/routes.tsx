import {AppDispatch, RootState} from './src/store'

import Register from './src/pages/Register/Register'
import Game from './src/pages/Game/Game'
import MainPage, {initMainPage} from './src/pages/MainPage/MainPage'
import NotFoundPage, {initNotFoundPage} from './src/pages/NotFound/404'
import Leaderboard, {initLeaderboardPage} from './src/pages/Leaderboard'
import Profile, {initProfilePage} from './src/pages/Profile/Profile'
import {Login} from './src/pages/Login/Login'
import ProtectedRoute from './src/routing/ProtectedRoute'
import Forum, {initForumPage} from './src/pages/Forum/Main'
import CreateTopicPage, {initCreateTopicPage} from './src/pages/Forum/CreateTopic'
import Topic, {initTopicPage} from './src/pages/Forum/Topic'

export type PageInitArgs = {
	dispatch: AppDispatch
	state: RootState
}

export const routes = [
	{
		path: '/',
		Component: MainPage,
		fetchData: initMainPage
	},
	{
		path: '/game',
		Component: Game
	},
	{
		path: '/profile',
		Component: Profile,
		fetchData: initProfilePage
	},
	{
		path: '/leaderboard',
		Component: Leaderboard,
		fetchData: initLeaderboardPage
	},
	{
		path: '/signup',
		Component: Register
	},
	{
		path: '/signin',
		Component: Login
	},
	{
		path: '/forum',
		Component: Forum,
		fetchData: initForumPage
	},
	{
		path: '/create-topic',
		Component: CreateTopicPage,
		fetchData: initCreateTopicPage
	},
	{
		path: '/topic',
		Component: Topic,
		fetchData: initTopicPage
	},
	{
		path: '/*',
		Component: NotFoundPage,
		fetchData: initNotFoundPage
	}
]
