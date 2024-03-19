import styles from './styles.module.scss'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useCallback, useEffect, useState} from 'react'
import {IUserData} from '../../entities/user'
import Avatar from '../../components/Avatar/Avatar'

interface ProfileProps {
	record?: number | undefined
}

const Profile = ({record}: ProfileProps) => {
	const navigate = useNavigate()
	const [userData, setUserData] = useState<IUserData | null>(null)

	const getUserData = useCallback(async () => {
		return axios
			.get('https://ya-praktikum.tech/api/v2/auth/user', {
				withCredentials: true
			})
			.then((res) => {
				return res.data
			})
	}, [])

	useEffect(() => {
		getUserData().then((data) => {
			setUserData(data)

			console.log(data)
		})
	}, [])

	return (
		<div className={styles.wrapper}>
			<div className={styles.back}>
				<img
					src='src/pages/Profile/images/back-btn.svg'
					alt='back'
					onClick={() => navigate('/')}
				/>
			</div>

			<div className={styles.avatarContainer}>
				<Avatar avatar={userData?.avatar} />

				<div className={styles.rating}>
					<img
						src='src/pages/Profile/images/rating.svg'
						alt='rating'
					/>
					<p className={styles.ratingCount}>{record}</p>
				</div>
			</div>

			<div className={styles.contentBlock}>
				{userData ? (
					<>
						<p className={styles.paragraph}>{userData.login}</p>
						<p className={styles.paragraph}>{userData.email}</p>
					</>
				) : (
					<p>Данные загружаются...</p>
				)}

				<div className={styles.settingsBtns}>
					<button
						className={styles.button}
						onClick={() => navigate('/profile-settings')}>
						Изменить данные
					</button>
				</div>
			</div>
		</div>
	)
}

export default Profile
