import styles from './MainPage.module.scss'
import logo from './../../assets/logo.png'
import {useAppSelector} from '../../hooks'
import {selectUser, fetchUserThunk} from '../../store/slices/user'
import {PageInitArgs} from '../../../routes'
import {usePage} from '../../hooks'
import {Link} from 'react-router-dom'
import {useCallback} from 'react'
import axios from 'axios'

const MainPage = () => {
	const user = useAppSelector(selectUser)
	console.log({user})
	usePage({initPage: initMainPage})

	const navigationLeft = [
		{title: 'Игра', path: '/game'},
		{title: 'Форум', path: '/forum'},
		{title: 'Рейтинг', path: '/leaderboard'}
	]

	const navigationRight = [
		{title: 'Профиль', path: '/profile'},
		{title: 'Выйти', path: '/'}
	]

	const addEmojiReaction = useCallback(async (emojiData: unknown) => {
		return axios
			.post('http://localhost:3001/api/emojis/add', emojiData, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				console.log('Cтатус: ', res.data.message)
				return res.data
			})
	}, [])

	const getEmojiReactions = useCallback(async (topicId: number) => {
		return axios
			.get(`http://localhost:3001/api/emojis/get?topicID=${topicId}`)
			.then((res) => {
				console.log(`Реакции к топику ${topicId}: `, res.data.reactions)
				return res.data
			})
	}, [])

	return (
		<div className={styles['main-page']}>
			{/* Тестовые кнопки для проверки работы бэка по взаимодействию с реакциями на топик */}
			<button
				onClick={() => {
					addEmojiReaction({topicId: 2, reaction: ['☺']})
				}}>
				Добавить реакцию
			</button>

			<button
				onClick={() => {
					getEmojiReactions(2)
				}}>
				Получить массив реакций
			</button>
			{/* --- */}

			<div className={styles['main-page__container']}>
				<nav className={styles['main-page__navigation']}>
					<div className={styles['main-page__navigation-item']}>
						{navigationLeft.map((item) => (
							<div
								className={styles['main-page__navigation-item']}
								key={item.title}>
								<Link to={item.path}>{item.title}</Link>
							</div>
						))}
					</div>
					<div className={styles['main-page__navigation-item']}>
						{navigationRight.map((item) => (
							<div
								className={styles['main-page__navigation-item']}
								key={item.title}>
								<Link to={item.path}>{item.title}</Link>
							</div>
						))}
					</div>
				</nav>
				<div className={styles['main-page__content']}>
					<img
						src={logo}
						className={styles['main-page__content-logo']}
						alt='logo'
					/>
					<h3>Тут суер крутое описание игры</h3>
					<div>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Etiam tempor orci eu lobortis
						elementum. Lobortis scelerisque fermentum dui faucibus in ornare quam viverra.
						Turpis massa sed elementum tempus egestas sed sed risus. Blandit cursus risus
						at ultrices mi tempus imperdiet. Tristique senectus et netus et malesuada
						fames. Augue eget arcu dictum varius duis at. A lacus vestibulum sed arcu non
						odio. Parturient montes nascetur ridiculus mus mauris vitae ultricies. Sed
						cras ornare arcu dui vivamus arcu felis bibendum ut. Viverra suspendisse
						potenti nullam ac tortor vitae. Eu facilisis sed odio morbi quis commodo odio.
						A arcu cursus vitae congue mauris. Sapien pellentesque habitant morbi
						tristique. Habitant morbi tristique senectus et netus. Scelerisque felis
						imperdiet proin fermentum leo. Purus sit amet luctus venenatis. Euismod nisi
						porta lorem mollis aliquam ut porttitor. Est placerat in egestas erat.
					</div>
				</div>
			</div>
		</div>
	)
}

export const initMainPage = async ({dispatch, state}: PageInitArgs) => {
	if (!selectUser(state)) {
		return dispatch(fetchUserThunk())
	}
}

export default MainPage
