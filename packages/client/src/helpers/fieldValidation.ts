import {FormValues} from '../pages/Register/model'
import {FormErrors} from '../pages/Register/Register'

const NAME_REGEXP = /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/
const LOGIN_REGEXP = /^[a-zA-Z0-9_-]{3,20}$/
const EMAIL_REGEXP =
	/^[A-Za-z0-9]+([._+-][A-Za-z0-9]+)*@[A-Za-z0-9]+([.-][A-Za-z0-9]+)*\.[A-Za-z]{2,}$/
const PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/
const PHONE_REGEXP = /^[+]?[0-9]{10,15}$/

export const fieldValidation = ({
	fieldName,
	value,
	errors
}: {
	fieldName: keyof FormValues
	value: string
	errors: FormErrors
}) => {
	let isValid = true
	const newErrors = {...errors}
	newErrors[fieldName] = ''

	switch (fieldName) {
		case 'first_name':
		case 'second_name': {
			if (!NAME_REGEXP.test(value)) {
				newErrors[fieldName] = 'Должно начинаться с большой буквы'
				isValid = false
			}
			break
		}
		case 'login': {
			if (!LOGIN_REGEXP.test(value)) {
				newErrors[fieldName] =
					'Допустимы только буквы, цифры, дефис и нижнее подчёркивание. Длина должна быть от 3 до 20 символов'
				isValid = false
			}
			break
		}
		case 'email': {
			if (!EMAIL_REGEXP.test(value)) {
				newErrors[fieldName] = 'Некорректный email'
				isValid = false
			}
			break
		}
		case 'password': {
			if (!PASSWORD_REGEXP.test(value)) {
				newErrors[fieldName] =
					'Пароль должен содержать не менее 8 символов, включая заглавные и строчные буквы и цифры'
				isValid = false
			}
			break
		}
		case 'phone': {
			if (!PHONE_REGEXP.test(value)) {
				newErrors[fieldName] = 'Некорректный номер телефона'
				isValid = false
			}
			break
		}
		default: {
			break
		}
	}

	return {isValid, newErrors}
}
