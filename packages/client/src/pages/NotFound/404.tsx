import {useNavigate} from 'react-router-dom'
import styles from './styles.module.scss'

const NotFoundPage = () => {
	const navigate = useNavigate()

	return (
		<div className={styles.wrapper}>
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
