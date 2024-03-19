import styles from './styles.module.scss'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useCallback, useEffect, useState} from 'react'
import {IUserData} from '../../entities/user'
import Avatar from '../../components/Avatar/Avatar'

interface IPassword {
	oldPassword?: string | undefined
	newPassword?: string | undefined
}

const ProfileSettings = () => {
	const navigate = useNavigate()
	const [userData, setUserData] = useState<IUserData | null>(null)
	const [avatarImage, setAvatarImage] = useState<File | null>(null)
	const [password, setPassword] = useState<IPassword | null>({
		oldPassword: '',
		newPassword: ''
	})

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
				console.log('avatar changed: ' + res.data)
				setUserData(res.data)

				console.log('userData: ' + userData)
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
					console.log('пароль изменён: ' + res)
				})
		},
		[]
	)

	useEffect(() => {
		getUserData().then((data) => {
			setUserData(data)
		})
	}, [])

	useEffect(() => {
		console.log(userData)
	}, [userData])

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
				<div className={styles.avatarImageContainer}>
					<Avatar avatar={userData?.avatar} />

					<input
						type='file'
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							const input: HTMLInputElement = event.target
							const file = input.files && input.files[0]

							setAvatarImage(file)
						}}
					/>

					<button
						onClick={() => {
							setAvatar(avatarImage)
						}}>
						Изменить аватар
					</button>
				</div>
			</div>

			<div className={styles.contentBlock}>
				{userData ? (
					<>
						<form
							onSubmit={(event) => {
								event.preventDefault()

								console.log(password)
								changePassword(password?.oldPassword, password?.newPassword)
							}}>
							<label>
								Введите старый пароль:
								<input
									className={styles.input}
									type='password'
									placeholder='.....'
									onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
										const inputValue = event.target.value
										setPassword((prevState) => ({
											...prevState,
											oldPassword: inputValue
										}))
									}}
								/>
							</label>

							<label>
								Введите новый пароль:
								<input
									className={styles.input}
									type='password'
									placeholder='.....'
									onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
										const inputValue = event.target.value
										setPassword((prevState) => ({
											...prevState,
											newPassword: inputValue
										}))
									}}
								/>
							</label>

							<button type='submit'>Изменить пароль</button>
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
