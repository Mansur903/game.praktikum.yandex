import {useNavigate} from 'react-router-dom'

import styles from './styles.module.scss'

const ServerErrorPage = () => {
	const navigate = useNavigate()

	return (
		<div className={styles.wrapper}>
			<div className={styles.page}>
				<h1 className={styles.page__header}>500</h1>
				<p className={styles.page__paragraph}>Мы уже фиксим...</p>
				<button
					onClick={() => navigate('/')}
					className={styles.page__button}>
					Вернуться на главную
				</button>
			</div>
		</div>
	)
}

export default ServerErrorPage
