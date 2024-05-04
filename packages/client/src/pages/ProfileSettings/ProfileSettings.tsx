import styles from './styles.module.scss'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useCallback, useContext, useEffect, useState} from 'react'
import {User} from '../../store/slices/user'
import Avatar from '../../components/Avatar/Avatar'
import ChangeAvatarModal from '../../components/Avatar/modules/ChangeAvatarModal'
import Input from '@mui/material/Input'
import {StyledButton} from '../Forum/BasicComponents'
import {ThemeContext} from '../../components/ThemeContext/ThemeContext'
import {ThemeVariant} from '../../types/enum/Theme.enum'
import backgroundDark from '../../assets/backgroundDark.jpg'
import background from '../../assets/backgroundMain.png'
import {StyledTextField} from '../Forum/BasicComponents'
interface IPassword {
	oldPassword?: string
	newPassword?: string
}

const ProfileSettings = () => {
	const navigate = useNavigate()
	const theme = useContext(ThemeContext)
	const [userData, setUserData] = useState<User | null>(null)
	const [avatarImage, setAvatarImage] = useState<File | null>(null)
	const [password, setPassword] = useState<IPassword | null>({
		oldPassword: '',
		newPassword: ''
	})

	const [isVisible, setIsVisible] = useState(false)

	const getUserData = useCallback(async () => {
		return axios
			.get('https://ya-praktikum.tech/api/v2/auth/user', {
				withCredentials: true
			})
			.then((res) => {
				return res.data
			})
	}, [])

	const setAvatar = useCallback(async (file: File | null) => {
		if (!file) {
			return
		}

		const formData = new FormData()
		formData.append('avatar', file)

		return axios
			.put('https://ya-praktikum.tech/api/v2/user/profile/avatar', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				withCredentials: true
			})
			.then((res) => {
				setUserData(res.data)
			})
			.catch((error) => {
				console.error(error)
			})
	}, [])

	const changePassword = useCallback(
		async (oldPassword: string | undefined, newPassword: string | undefined) => {
			return axios
				.put(
					'https://ya-praktikum.tech/api/v2/user/password',
					{
						oldPassword: oldPassword,
						newPassword: newPassword
					},
					{withCredentials: true}
				)
				.then((res) => {
					console.log('Пароль изменён')
				})
		},
		[]
	)

	useEffect(() => {
		getUserData().then((data) => {
			setUserData(data)
		})
	}, [])

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const input: HTMLInputElement = event.target
		const file = input.files && input.files[0]

		setAvatarImage(file)
	}

	return (
		<div
			style={{
				backgroundImage: `url(${
					ThemeVariant.LIGHT === theme ? background : backgroundDark
				})`
			}}
			className={styles.profileSettings}>
			<div className={styles.profileSettings__backBtn}>
				<img
					src='src/pages/Profile/images/back-btn.svg'
					alt='back'
					onClick={() => navigate('/profile')}
				/>
			</div>

			<div className={styles.profileSettings__avatar}>
				<Avatar
					currentPage='settings'
					onButtonClick={() => {
						setIsVisible(!isVisible)
					}}
					avatar={userData?.avatar}
				/>

				{isVisible ? (
					<ChangeAvatarModal
						onInputChange={handleInputChange}
						onCloseButtonClick={() => {
							setIsVisible(!isVisible)
						}}
						onLoadButtonClick={() => {
							setAvatar(avatarImage)
							setIsVisible(!isVisible)
						}}
					/>
				) : null}
			</div>

			<div className={styles.profileSettings__data}>
				{userData ? (
					<>
						<form
							onSubmit={(event) => {
								event.preventDefault()
								changePassword(password?.oldPassword, password?.newPassword)
							}}>
							<StyledTextField
								type='password'
								placeholder='Старый пароль'
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
									const inputValue = event.target.value
									setPassword((prevState) => ({
										...prevState,
										oldPassword: inputValue
									}))
								}}
							/>

							<StyledTextField
								type='password'
								placeholder='Новый пароль'
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
									const inputValue = event.target.value
									setPassword((prevState) => ({
										...prevState,
										newPassword: inputValue
									}))
								}}
							/>

							<StyledButton
								variant='outlined'
								type='submit'>
								Изменить пароль
							</StyledButton>
						</form>
					</>
				) : (
					<p>Данные загружаются...</p>
				)}
			</div>
		</div>
	)
}

export default ProfileSettings
