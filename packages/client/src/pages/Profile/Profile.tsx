import styles from './styles.module.scss'
import {useNavigate} from 'react-router-dom'
import {PageInitArgs} from '../../../routes'
import {fetchUserThunk, selectUser} from '../../entities/user'

interface ProfileProps {
	avatarImage?: string | undefined
	name?: string | undefined
	email?: string | undefined
	record?: number | undefined
}

const Profile = ({avatarImage, record, name, email}: ProfileProps) => {
	const navigate = useNavigate()

	return (
		<div className={styles.wrapper}>
			<div className={styles.back}>
				<img
					src='src/pages/Profile/images/back-btn.svg'
					alt='back'
					onClick={() => navigate('/')}
				/>
			</div>

			<div className={styles.avatarContainer}>
				<img
					src={avatarImage}
					className={styles.avatar}
					alt='avatar'
				/>

				<div className={styles.rating}>
					<img
						src='src/pages/Profile/images/rating.svg'
						alt='rating'
					/>
					<p className={styles.ratingCount}>{record}</p>
				</div>
			</div>

			<div className={styles.contentBlock}>
				<p className={styles.paragraph}>{name}</p>
				<p className={styles.paragraph}>{email}</p>

				<div className={styles.settingsBtns}>
					<button className={styles.button}>Изменить данные</button>
					<button className={styles.button}>Изменить пароль</button>
				</div>
			</div>
		</div>
	)
}

export const initProfilePage = async ({dispatch, state}: PageInitArgs) => {
	if (!selectUser(state)) {
		return dispatch(fetchUserThunk())
	}
}

export default Profile
