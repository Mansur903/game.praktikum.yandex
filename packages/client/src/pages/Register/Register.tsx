import React, {useCallback, useState} from 'react'
import {Button, Box, TextField, Typography, Link} from '@mui/material'
import axios from 'axios'
import {FormValues} from './model'
import bg from './bg.svg'
import {fieldValidation} from '../../helpers/fieldValidation'

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

export type FormErrors = Partial<Record<keyof FormValues, string>>

const SignUpPage: React.FC = () => {
	const [formValues, setFormValues] = useState<FormValues>({
		first_name: '',
		second_name: '',
		login: '',
		email: '',
		password: '',
		phone: ''
	})

	const [errors, setErrors] = useState<FormErrors>({})

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const {name, value} = e.target
			setFormValues((prevValues) => ({
				...prevValues,
				[name]: value
			}))
			const {newErrors} = fieldValidation({
				fieldName: name as keyof FormValues,
				value,
				errors
			})
			setErrors(newErrors)
		},
		[errors]
	)

	const handleSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault()

			let isValid = true
			let validationErrors = {...errors}
			for (const [name, value] of Object.entries(formValues)) {
				const {isValid: isFieldValid, newErrors} = fieldValidation({
					fieldName: name as keyof FormValues,
					value,
					errors
				})
				isValid = isFieldValid
				validationErrors = {...validationErrors, ...newErrors}
			}
			setErrors(validationErrors)

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
		},
		[formValues, errors]
	)

	return (
		<Box sx={boxRootSXProps}>
			<Box
				sx={{
					minWidth: 400,
					padding: 4
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
							Регистрация
						</Typography>
						<TextField
							label='Имя'
							name={'first_name' as keyof FormValues}
							value={formValues.first_name}
							onChange={handleChange}
							error={!!errors.first_name}
							helperText={errors.first_name}
							sx={textFieldSXProps}
							InputLabelProps={textFieldInputLabelProps}
						/>
						<TextField
							label='Фамилия'
							name={'second_name' as keyof FormValues}
							value={formValues.second_name}
							onChange={handleChange}
							error={!!errors.second_name}
							helperText={errors.second_name}
							sx={textFieldSXProps}
							InputLabelProps={textFieldInputLabelProps}
						/>
						<TextField
							label='Логин'
							name={'login' as keyof FormValues}
							value={formValues.login}
							onChange={handleChange}
							error={!!errors.login}
							helperText={errors.login}
							sx={textFieldSXProps}
							InputLabelProps={textFieldInputLabelProps}
						/>
						<TextField
							label='Email'
							name={'email' as keyof FormValues}
							value={formValues.email}
							onChange={handleChange}
							error={!!errors.email}
							helperText={errors.email}
							sx={textFieldSXProps}
							InputLabelProps={textFieldInputLabelProps}
						/>
						<TextField
							label='Пароль'
							name={'password' as keyof FormValues}
							type='password'
							value={formValues.password}
							onChange={handleChange}
							error={!!errors.password}
							helperText={errors.password}
							sx={textFieldSXProps}
							InputLabelProps={textFieldInputLabelProps}
						/>
						<TextField
							label='Телефон'
							name={'phone' as keyof FormValues}
							value={formValues.phone}
							onChange={handleChange}
							error={!!errors.phone}
							helperText={errors.phone}
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
							Зарегистрироваться
						</Button>
					</Box>
				</form>
				<Typography
					variant='body2'
					sx={{textAlign: 'center', marginTop: 2, color: 'white'}}>
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
