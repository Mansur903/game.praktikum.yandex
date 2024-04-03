import CreateTopicPage, {initCreateTopicPage} from './src/pages/Forum/CreateTopic'
import Forum, {initForumPage} from './src/pages/Forum/Main'
import Topic, {initTopicPage} from './src/pages/Forum/Topic'
import Game, {initGamePage} from './src/pages/Game/Game'
import Leaderboard, {initLeaderboardPage} from './src/pages/Leaderboard'
import {Login} from './src/pages/Login/Login'
import MainPage, {initMainPage} from './src/pages/MainPage/MainPage'
import NotFoundPage, {initNotFoundPage} from './src/pages/NotFound/404'
import Profile, {initProfilePage} from './src/pages/Profile/Profile'
import Register from './src/pages/Register/Register'
import ProfileSettings from './src/pages/ProfileSettings/ProfileSettings'
import ProtectedRoute from './src/routing/ProtectedRoute'
import {AppDispatch, RootState} from './src/store/store'

export type PageInitArgs = {
	dispatch: AppDispatch
	state: RootState
}

export const routes: any = [
	{
		path: '/',
		Component: ProtectedRoute,
		children: [
			{
				path: '/',
				Component: MainPage,
				fetchData: initMainPage
			},
			{
				path: '/game',
				Component: Game,
				fetchData: initGamePage
			},
			{
				path: '/profile',
				Component: Profile,
				fetchData: initProfilePage
			},
			{
				path: '/profile-settings',
				Component: ProfileSettings
			},
			{
				path: '/leaderboard',
				Component: Leaderboard,
				fetchData: initLeaderboardPage
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
	},
	{
		path: '/signup',
		Component: Register
	},
	{
		path: '/signin',
		Component: Login
	}
]
