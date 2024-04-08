import React, {useCallback, useState} from 'react'
import {Button, Box, TextField, Typography, Link, Icon} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

import {LoginValues} from './model'
import bg from '../../assets/backgroundMain.png'
import icon from '../../assets/yandexLogo.svg'
import {AppError, AppErrorCode} from '../../lib/error'
import {jsApiIdentify, redirectToOauthAuthorize} from '../../lib/auth'
import {BASE_URL, OAUTH_REDIRECT_URI, OAUTH_YANDEX_SERVICE_ID} from '../../config/api'

const textFieldSXProps = {
	fieldset: {
		borderColor: 'white',
		color: 'white',
		'& .MuiOutlinedInputNotchedOutline': {
			borderColor: 'white'
		}
	}
}
const textFieldInputLabelProps = {
	style: {
		color: 'white'
	}
}

const boxRootSXProps = {
	backgroundImage: `url(${bg})`,
	backgroundSize: 'cover',
	backgroundRepeat: 'no-repeat',
	backgroundPosition: 'center',
	width: '100vw',
	height: '100vh'
}

const boxFormSXProps = {
	display: 'flex',
	flexDirection: 'column',
	gap: 2,
	width: '100%',
	maxWidth: 400,
	borderRadius: 2,
	padding: 2,
	margin: '0 auto'
}

export const Login: React.FC = () => {
	const navigate = useNavigate()

	const [formValues, setFormValues] = useState<LoginValues>({
		login: '',
		password: ''
	})

	const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target
		setFormValues((prevValues) => ({
			...prevValues,
			[name]: value
		}))
	}, [])

	const onLoginClick = async () => {
		const {data: clientID} = await axios.get(`${BASE_URL}${OAUTH_YANDEX_SERVICE_ID}`, {
			params: {
				OAUTH_REDIRECT_URI
			}
		})

		try {
			await jsApiIdentify(clientID.service_id)
		} catch (err) {
			if (err instanceof AppError) {
				const {code} = err

				switch (code) {
					case AppErrorCode.JsApiCancelled:
						console.warn(err)
						return
					case AppErrorCode.JsApiMethodNotAvailable:
						redirectToOauthAuthorize(clientID.service_id)
						return
				}

				console.error(err)
				alert('Не удалось войти. Попробуйте ещё раз')
			} else {
				throw err
			}
		}
	}

	const handleSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault()
			await axios
				.post(`${BASE_URL}auth/signin`, formValues, {
					headers: {
						'Content-Type': 'application/json'
					},
					withCredentials: true
				})
				.then((response) => {
					const userData = JSON.parse(response.config.data)
					console.log(userData)
				})
				.then(() => {
					navigate('/')
				})
				.catch((error) => console.log(error))
		},
		[formValues]
	)
	return (
		<Box sx={boxRootSXProps}>
			<Box
				sx={{
					minWidth: 400,
					padding: 4,
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)'
				}}>
				<Typography
					variant='h4'
					sx={{textAlign: 'center', marginBottom: 2, color: '#E8BDD9'}}>
					Flappy Progger
				</Typography>
				<form onSubmit={handleSubmit}>
					<Box sx={boxFormSXProps}>
						<Typography
							variant='h6'
							sx={{textAlign: 'center', color: 'white'}}>
							Вход
						</Typography>
						<TextField
							label='Логин'
							name='login'
							value={formValues.login}
							onChange={handleChange}
							sx={textFieldSXProps}
							InputLabelProps={textFieldInputLabelProps}
						/>
						<TextField
							label='Пароль'
							name='password'
							type='password'
							value={formValues.password}
							onChange={handleChange}
							sx={textFieldSXProps}
							InputLabelProps={textFieldInputLabelProps}
						/>
						<Button
							type='submit'
							sx={{
								color: '#36981D',
								fontWeight: 'bold',
								padding: 2,
								width: '100%',
								border: 'solid 1px #36981D'
							}}>
							Войти
						</Button>
					</Box>
				</form>
				<Button
					type='button'
					onClick={onLoginClick}
					sx={{
						color: '#fff',
						fontWeight: 'bold',
						padding: 2,
						margin: 2,
						width: '100%',
						backgroundColor: '#000'
					}}>
					<img
						alt='иконка'
						src={icon}
					/>
					<Box
						component='span'
						sx={{ml: 2}}>
						Войти с помощью Яндекс
					</Box>
				</Button>
				<Typography
					variant='body2'
					sx={{textAlign: 'center', marginTop: 2, color: 'white'}}>
					Нет аккаунта?{' '}
					<Link
						href='/signup'
						underline='none'>
						Зарегистрироваться
					</Link>
				</Typography>
			</Box>
		</Box>
	)
}
