import logo from './../../assets/logo.png'
import background from './../../assets/backgroundMain.png'
import backgroundDark from './../../assets/backgroundDark.jpg'
import {useAppDispatch, useAppSelector} from '../../hooks'
import {selectUser, fetchUserThunk, clearUser} from '../../store/slices/user'
import {PageInitArgs} from '../../../routes'
import {usePage} from '../../hooks'
import {useNavigate} from 'react-router-dom'
import {Box, Button} from '@mui/material'
import axios from 'axios'
import {useContext} from 'react'
import {ThemeContext} from '../../components/ThemeContext/ThemeContext'

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
		</Box>
	)
}

export const initMainPage = async ({dispatch, state}: PageInitArgs) => {
	if (!selectUser(state)) {
		return dispatch(fetchUserThunk())
	}
}

export default MainPage
