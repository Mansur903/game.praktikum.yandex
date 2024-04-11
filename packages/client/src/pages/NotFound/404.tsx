import {useNavigate} from 'react-router-dom'
import styles from './styles.module.scss'
import {useContext} from 'react'
import {ThemeContext} from '../../components/ThemeContext/ThemeContext'
import backgroundDark from '../../assets/notFoundDark.jpg'
import background from '../../assets/background404.png'
import {ThemeVariant} from '../../types/enum/Theme.enum'

const NotFoundPage = () => {
	const navigate = useNavigate()
	const theme = useContext(ThemeContext)
	return (
		<div
			style={{
				backgroundImage: `url(${
					ThemeVariant.LIGHT === theme ? background : backgroundDark
				})`
			}}
			className={styles.wrapper}>
			<div className={styles.page}>
				<h1 className={styles.page__header}>404</h1>
				<p className={styles.page__paragraph}>Упс... здесь ничего нет</p>
				<button
					onClick={() => navigate('/')}
					className={styles.page__button}>
					Вернуться на главную
				</button>
			</div>
		</div>
	)
}

export const initNotFoundPage = () => Promise.resolve()
export default NotFoundPage
