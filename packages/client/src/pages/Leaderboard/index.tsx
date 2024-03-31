import styles from './styles.module.scss'
import BoardItem from './BoardItem/index'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

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
				return 'trophy1.png'
			case 2:
				return 'trophy2.png'
			case 3:
				return 'trophy3.png'
			default:
				return 'round.png'
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
								icon={`../../src/assets/${setIconPath(item.position)}`}
								score={item.score}
							/>
						) : null
					)}
				</ul>
			</div>
		</div>
	)
}

export default Leaderboard
