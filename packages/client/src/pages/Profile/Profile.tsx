import TextField from '@mui/material/TextField'
import {styled} from '@mui/material/styles'
import axios from 'axios'
import {useCallback, useContext, useEffect, useState} from 'react'
import toast, {Toaster} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

import {PageInitArgs} from '../../../routes'
import backgroundDark from '../../assets/backgroundDark.jpg'
import background from '../../assets/backgroundMain.png'
import Avatar from '../../components/Avatar/Avatar'
import {ThemeContext} from '../../components/ThemeContext/ThemeContext'
import {useAppSelector, usePage} from '../../hooks'
import {User, fetchUserThunk, selectUser} from '../../store/slices/user'
import {ThemeVariant} from '../../types/enum/Theme.enum'
import {StyledButton} from '../Forum/BasicComponents'
import styles from './styles.module.scss'

const StyledDataHolder = styled(TextField)(() => {
	const theme = useContext(ThemeContext)
	const color = ThemeVariant.LIGHT === theme ? 'var(--white)' : 'var(--black)'
	return {
		color: color,
		borderRadius: '10px',
		borderColor: color,
		pointerEvents: 'none',
		'&:hover': {
			borderColor: color
		}
	}
})

interface ProfileProps {
	avatarImage?: string | undefined
	name?: string | undefined
	email?: string | undefined
	record?: number | undefined
}

const Profile = ({avatarImage, record, name, email}: ProfileProps) => {
	const navigate = useNavigate()
	const theme = useContext(ThemeContext)
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
			.catch((e) => toast.error(e.response?.data?.reason ?? 'Что-то пошло не так'))
	}, [])

	useEffect(() => {
		getUserData().then((data) => {
			setUserData(data)

			console.log(data)
		})
	}, [])

	return (
		<div
			style={{
				backgroundImage: `url(${
					ThemeVariant.LIGHT === theme ? background : backgroundDark
				})`
			}}
			className={styles.profile}>
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
			<Toaster position={'bottom-left'} />
		</div>
	)
}

export const initProfilePage = async ({dispatch, state}: PageInitArgs) => {
	if (!selectUser(state)) {
		return dispatch(fetchUserThunk())
	}
}

export default Profile
