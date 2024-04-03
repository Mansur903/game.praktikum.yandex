import styles from './styles.module.scss'
import {useNavigate} from 'react-router-dom'
import {PageInitArgs} from '../../../routes'
import {fetchUserThunk, selectUser} from '../../store/slices/user'
import {useAppSelector, usePage} from '../../hooks'
import axios from 'axios'
import {useCallback, useEffect, useState} from 'react'
import {User} from '../../store/slices/user'
import Avatar from '../../components/Avatar/Avatar'
import {styled} from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import {StyledButton} from '../Forum/BasicComponents'

const StyledDataHolder = styled(TextField)(() => ({
	color: 'var(--white)',
	borderRadius: '10px',
	borderColor: 'var(--white)',
	pointerEvents: 'none',
	'&:hover': {
		borderColor: 'var(--white)'
	}
}))

interface ProfileProps {
	avatarImage?: string | undefined
	name?: string | undefined
	email?: string | undefined
	record?: number | undefined
}

const Profile = ({avatarImage, record, name, email}: ProfileProps) => {
	const navigate = useNavigate()
	const user = useAppSelector(selectUser)
	usePage({initPage: initProfilePage})

	const [userData, setUserData] = useState<User | null>(null)

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
		<div className={styles.profile}>
			<div className={styles.profile__backBtn}>
				<img
					src='src/pages/Profile/images/back-btn.svg'
					alt='back'
					onClick={() => navigate('/')}
				/>
			</div>

			<div className={styles.profile__avatarContainer}>
				<Avatar avatar={userData?.avatar} />

				<div className={styles.profile__rating}>
					<img
						src='src/pages/Profile/images/rating.svg'
						alt='rating'
					/>
					<p className={styles.avatar__ratingCount}>{record}</p>
				</div>
			</div>

			<div className={styles.profile__contentBlock}>
				{userData ? (
					<>
						<StyledDataHolder
							placeholder={userData.login}
							className={styles.paragraph}
						/>
						<StyledDataHolder
							placeholder={userData.email}
							className={styles.paragraph}
						/>
					</>
				) : (
					<p>Данные загружаются...</p>
				)}

				<StyledButton
					variant='outlined'
					onClick={() => navigate('/profile-settings')}>
					Изменить данные
				</StyledButton>
			</div>
		</div>
	)
}

export const initProfilePage = async ({dispatch, state}: PageInitArgs) => {
	if (!selectUser(state)) {
		return dispatch(fetchUserThunk())
	}
}

export default Profile
