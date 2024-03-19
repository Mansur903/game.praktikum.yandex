import styles from './styles.module.scss'
import {IUserData} from '../../entities/user'

const Avatar = ({avatar}: IUserData) => {
	return (
		<>
			{avatar ? (
				<img
					src={`https://ya-praktikum.tech/api/v2/resources${avatar}`}
					className={styles.avatar}
					alt='avatar'
				/>
			) : (
				<p>Данные загружаются...</p>
			)}
		</>
	)
}

export default Avatar
