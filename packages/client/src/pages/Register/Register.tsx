import React, {useCallback, useContext, useState} from 'react'
import {Button, Box, TextField, Typography, Link} from '@mui/material'
import axios from 'axios'
import {FormValues} from './model'
import bg from '../../assets/backgroundMain.png'
import bgDark from '../../assets/backgroundDark.jpg'
import {fieldValidation} from '../../helpers/fieldValidation'
import {useNavigate} from 'react-router-dom'
import {ThemeContext} from '../../components/ThemeContext/ThemeContext'
import {ThemeVariant} from '../../types/enum/Theme.enum'
import {NoSsr} from '@mui/base/NoSsr'

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

const boxRootSXProps = (theme: string) => ({
	backgroundImage: `url(${theme === ThemeVariant.LIGHT ? bg : bgDark})`,
	backgroundSize: 'cover',
	backgroundRepeat: 'no-repeat',
	backgroundPosition: 'center',
	width: '100vw',
	height: '100vh'
})

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

const useAuthorizationValidation = (
	formValues: FormValues,
	errors: FormErrors
): {isValid: boolean; validationErrors: FormErrors} => {
	const validateForm = useCallback(() => {
		let isValid = true
		let validationErrors = {...errors}

		for (const [name, value] of Object.entries(formValues)) {
			const {isValid: isFieldValid, newErrors} = fieldValidation({
				fieldName: name as keyof FormValues,
				value,
				errors
			})

			isValid = isValid && isFieldValid
			validationErrors = {...validationErrors, ...newErrors}
		}

		return {isValid, validationErrors}
	}, [formValues, errors])

	return validateForm()
}

const SignUpPage: React.FC = () => {
	const navigate = useNavigate()
	const theme = useContext(ThemeContext)
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
					await axios
						.post('https://ya-praktikum.tech/api/v2/auth/signup', formValues)
						.then(() => {
							navigate('/signin')
						})
				} catch (error) {
					console.log(error)
				}
			}
		},
		[formValues, errors]
	)

	const {isValid, validationErrors} = useAuthorizationValidation(formValues, errors)

	return (
		<NoSsr>
			<Box sx={boxRootSXProps(theme)}>
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
								name='first_name'
								value={formValues.first_name}
								onChange={handleChange}
								error={!!errors.first_name}
								helperText={errors.first_name}
								sx={textFieldSXProps}
								InputLabelProps={textFieldInputLabelProps}
							/>
							<TextField
								label='Фамилия'
								name='second_name'
								value={formValues.second_name}
								onChange={handleChange}
								error={!!errors.second_name}
								helperText={errors.second_name}
								sx={textFieldSXProps}
								InputLabelProps={textFieldInputLabelProps}
							/>
							<TextField
								label='Логин'
								name='login'
								value={formValues.login}
								onChange={handleChange}
								error={!!errors.login}
								helperText={errors.login}
								sx={textFieldSXProps}
								InputLabelProps={textFieldInputLabelProps}
							/>
							<TextField
								label='Email'
								name='email'
								value={formValues.email}
								onChange={handleChange}
								error={!!errors.email}
								helperText={errors.email}
								sx={textFieldSXProps}
								InputLabelProps={textFieldInputLabelProps}
							/>
							<TextField
								label='Пароль'
								name='password'
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
								name='phone'
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
									color: 'var(--red)',
									fontWeight: 'bold',
									padding: 2,
									width: '100%',
									border: 'solid 1px var(--red)'
								}}
								disabled={!isValid} // Disable button if form is not valid
							>
								Зарегистрироваться
							</Button>
						</Box>
					</form>
					<Typography
						variant='body2'
						sx={{textAlign: 'center', marginTop: 2, color: 'white'}}>
						Уже зарегистрированы?{' '}
						<Link
							href='/signin'
							underline='none'>
							Войти
						</Link>
					</Typography>
				</Box>
			</Box>
		</NoSsr>
	)
}

export default SignUpPage
