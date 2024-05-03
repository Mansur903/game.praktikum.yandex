import {Box, Button} from '@mui/material'
import axios from 'axios'
import {useContext} from 'react'
import toast, {Toaster} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

import {PageInitArgs} from '../../../routes'
import {ThemeContext} from '../../components/ThemeContext/ThemeContext'
import {useAppDispatch, useAppSelector, usePage} from '../../hooks'
import {clearUser, fetchUserThunk, selectUser} from '../../store/slices/user'
import backgroundDark from './../../assets/backgroundDark.jpg'
import background from './../../assets/backgroundMain.png'
import logo from './../../assets/logo.png'

const buttonProps = {
	color: 'white',
	border: 1,
	marginTop: 2
}

const MainPage = () => {
	const theme = useContext(ThemeContext)
	const user = useAppSelector(selectUser)
	const dispatch = useAppDispatch()
	usePage({initPage: initMainPage})

	const navigate = useNavigate()

	const handleButtonClick = (url: string) => {
		navigate(url)
	}

	const handleLogoutClick = async () => {
		await axios
			.post('https://ya-praktikum.tech/api/v2/auth/logout', {}, {withCredentials: true})
			.then(() => {
				dispatch(clearUser())
				navigate('/signin')
			})
			.catch((e) => toast.error(e.response?.data?.reason ?? 'Что-то пошло не так'))
	}

	return (
		<Box
			sx={{
				backgroundImage: `url(${theme === 'light' ? background : backgroundDark})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				height: '100vh',
				position: 'relative'
			}}>
			<Button
				sx={{position: 'absolute', top: '10px', left: '10px', color: 'white'}}
				onClick={() => handleLogoutClick()}>
				Выйти
			</Button>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100%'
				}}>
				<Box sx={{display: 'flex', justifyContent: 'center', width: '50%'}}>
					<Box
						sx={{
							width: '50%',
							display: 'flex',
							flexDirection: 'column',
							padding: '30px',
							textAlign: 'center',
							maxWidth: '200px',
							justifyContent: 'center'
						}}>
						<Button
							sx={buttonProps}
							onClick={() => handleButtonClick('/game')}>
							Играть
						</Button>
						<Button
							sx={buttonProps}
							onClick={() => handleButtonClick('/profile')}>
							Профиль
						</Button>
						<Button
							sx={buttonProps}
							onClick={() => handleButtonClick('/leaderboard')}>
							Рейтинг
						</Button>
						<Button
							sx={buttonProps}
							onClick={() => handleButtonClick('/forum')}>
							Форум
						</Button>
					</Box>
					<Box sx={{width: '50%', textAlign: 'center'}}>
						<img
							src={logo}
							alt='Изображение'
							style={{maxWidth: '100%', maxHeight: '100%'}}
						/>
					</Box>
				</Box>
			</Box>
			<Toaster position={'bottom-left'} />
		</Box>
	)
}

export const initMainPage = async ({dispatch, state}: PageInitArgs) => {
	if (!selectUser(state)) {
		return dispatch(fetchUserThunk())
	}
}

export default MainPage
