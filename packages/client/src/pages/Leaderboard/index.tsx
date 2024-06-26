import styles from './styles.module.scss'
import BoardItem from './BoardItem/index'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {PageInitArgs} from '../../../routes'
import {fetchUserThunk, selectUser} from '../../store/slices/user'
import axios from 'axios'
import trophyOne from './../../assets/trophy1.png'
import trophyTwo from './../../assets/trophy2.png'
import trophyThree from './../../assets/trophy2.png'
import round from './../../assets/round.png'

import api from '../../api'
import {ILeaderboardResponseItem, ILeader} from '../../types/types'

const Leaderboard = () => {
	const [list, setList] = useState<ILeader[]>([])
	const navigate = useNavigate()

	useEffect(() => {
		const requestBody = {
			ratingFieldName: 'score',
			cursor: 0,
			limit: 8
		}

		axios
			.post(api.leaderboard.getTeam, requestBody, {
				headers: {
					'Content-Type': 'application/json'
				},
				withCredentials: true
			})
			.then((response) => {
				const data = response.data.map(
					(item: ILeaderboardResponseItem, index: number) => ({
						position: index + 1,
						...item.data
					})
				)
				setList(data)
			})
	}, [])

	const setIconPath = (position: number) => {
		switch (position) {
			case 1:
				return trophyOne
			case 2:
				return trophyTwo
			case 3:
				return trophyThree
			default:
				return round
		}
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.page}>
				<button
					className={styles.page__button}
					onClick={() => navigate('/')}>
					На главную
				</button>
				<h1 className={styles.page__header}>Рейтинг игроков</h1>

				<ul className={styles.page__board}>
					{list.map((item, index) =>
						index < 8 ? (
							<BoardItem
								key={index}
								position={item.position}
								name={item.login ? item.login : 'Unknown user'}
								photo={item.avatar ? item.avatar : ''}
								icon={setIconPath(item.position)}
								score={item.score}
							/>
						) : null
					)}
				</ul>
			</div>
		</div>
	)
}

export const initLeaderboardPage = async ({dispatch, state}: PageInitArgs) => {
	if (!selectUser(state)) {
		return dispatch(fetchUserThunk())
	}
}

export default Leaderboard
