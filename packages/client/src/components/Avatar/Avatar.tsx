import styles from './styles.module.scss'
import {useState} from 'react'
import {StyledButton} from '../../pages/Forum/BasicComponents'
import {User} from '../../store/slices/user'
import defaultPhoto from './../../assets/default-avatar.png'

interface IAvatarProps extends User {
	onButtonClick?: () => void
	currentPage?: string
}

const Avatar = ({avatar, onButtonClick, currentPage}: IAvatarProps) => {
	const [isVisible, setIsVisible] = useState(false)

	return (
		<>
			<div
				className={styles.avatar}
				onMouseEnter={() => {
					currentPage === 'settings' && setIsVisible(!isVisible)
				}}
				onMouseLeave={() => {
					currentPage === 'settings' && setIsVisible(!isVisible)
				}}>
				<img
					src={
						avatar ? `https://ya-praktikum.tech/api/v2/resources${avatar}` : defaultPhoto
					}
					className={styles.avatar__image}
					alt='avatar'
				/>

				{isVisible ? (
					<div className={styles.avatar__btnContainer}>
						<StyledButton
							variant='outlined'
							onClick={onButtonClick}>
							Изменить аватар
						</StyledButton>
					</div>
				) : null}
			</div>
		</>
	)
}

export default Avatar
