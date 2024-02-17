import React, {useState} from 'react'
import {Button, Box, TextField, Typography, Link} from '@mui/material'
import axios from 'axios'
import {FormValues} from './model'
import bg from './bg.svg'

const SignUpPage: React.FC = () => {
	const [formValues, setFormValues] = useState<FormValues>({
		first_name: '',
		second_name: '',
		login: '',
		email: '',
		password: '',
		phone: ''
	})

	const [errors, setErrors] = useState<Partial<FormValues>>({})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target
		setFormValues((prevValues) => ({
			...prevValues,
			[name]: value
		}))

		validateField(name, value)
	}

	const validateField = (fieldName: keyof FormValues, value: string) => {
		let isValid = true
		const newErrors = {...errors}
		newErrors[fieldName] = ''

		const nameRegex = /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/
		if (
			(fieldName === 'first_name' || fieldName === 'second_name') &&
			!nameRegex.test(value)
		) {
			newErrors[fieldName] = 'Должно начинаться с большой буквы'
			isValid = false
		}

		const loginRegex = /^(?!\\d+$)[a-zA-Z\\d_-]{3,20}$/
		if (fieldName === 'login' && !loginRegex.test(value)) {
			newErrors[fieldName] =
				'Допустимы только буквы, цифры, дефис и нижнее подчёркивание. Длина должна быть от 3 до 20 символов'
			isValid = false
		}

		const emailRegex =
			/^[A-Za-z0-9]+([._+-][A-Za-z0-9]+)*@[A-Za-z0-9]+([.-][A-Za-z0-9]+)*\.[A-Za-z]{2,}$/
		if (fieldName === 'email' && !emailRegex.test(value)) {
			newErrors[fieldName] = 'Некорректный email'
			isValid = false
		}

		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/
		if (fieldName === 'password' && !passwordRegex.test(value)) {
			newErrors[fieldName] =
				'Пароль должен содержать не менее 8 символов, включая заглавные и строчные буквы и цифры'
			isValid = false
		}

		const phoneRegex = /^[+]?[0-9]{10,15}$/
		if (fieldName === 'phone' && !phoneRegex.test(value)) {
			newErrors[fieldName] = 'Некорректный номер телефона'
			isValid = false
		}

		setErrors(newErrors)
		return isValid
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		let isValid = true
		Object.keys(formValues).forEach((field) => {
			isValid =
				validateField(field as keyof FormValues, formValues[field as keyof FormValues]) &&
				isValid
		})

		if (isValid) {
			try {
				const response = axios.post(
					'https://ya-praktikum.tech/api/v2/api/signup',
					formValues
				)
				console.log(response)
			} catch (error) {
				console.log(error)
			}
		}
	}

	return (
		<Box
			sx={{
				backgroundImage: `url(${bg})`,
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
				width: '100vw',
				height: '100vh'
			}}>
			<Box
				sx={{
					minWidth: 500,
					padding: 4,
					borderRadius: 4,
					boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					background: 'white'
				}}>
				<Typography
					variant='h4'
					sx={{textAlign: 'center', marginBottom: 2, color: '#E8BDD9'}}>
					Flappy Progger
				</Typography>
				<form onSubmit={handleSubmit}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 2,
							width: '100%',
							maxWidth: 400,
							borderRadius: 2,
							padding: 2,
							margin: '0 auto'
						}}>
						<Typography
							variant='h6'
							sx={{textAlign: 'center'}}>
							Регистрация
						</Typography>
						<TextField
							label='Имя'
							name='first_name'
							value={formValues.first_name}
							onChange={handleChange}
							error={!!errors.first_name}
							helperText={errors.first_name}
						/>
						<TextField
							label='Фамилия'
							name='second_name'
							value={formValues.second_name}
							onChange={handleChange}
							error={!!errors.second_name}
							helperText={errors.second_name}
						/>
						<TextField
							label='Логин'
							name='login'
							value={formValues.login}
							onChange={handleChange}
							error={!!errors.login}
							helperText={errors.login}
						/>
						<TextField
							label='Email'
							name='email'
							value={formValues.email}
							onChange={handleChange}
							error={!!errors.email}
							helperText={errors.email}
						/>
						<TextField
							label='Пароль'
							name='password'
							type='password'
							value={formValues.password}
							onChange={handleChange}
							error={!!errors.password}
							helperText={errors.password}
						/>
						<TextField
							label='Телефон'
							name='phone'
							value={formValues.phone}
							onChange={handleChange}
							error={!!errors.phone}
							helperText={errors.phone}
						/>
						<Button
							type='submit'
							sx={{
								color: '#36981D',
								padding: 2,
								width: '100%',
								border: 'solid 1px #36981D'
							}}>
							Зарегистрироваться
						</Button>
					</Box>
				</form>
				<Typography
					variant='body2'
					sx={{textAlign: 'center', marginTop: 2}}>
					Уже зарегистрированы?{' '}
					<Link
						href='/login'
						underline='none'>
						Войти
					</Link>
				</Typography>
			</Box>
		</Box>
	)
}

export default SignUpPage
