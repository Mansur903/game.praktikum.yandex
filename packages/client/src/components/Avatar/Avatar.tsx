import styles from './styles.module.scss'
import {IUserData} from '../../entities/user'
import {useState} from 'react'
import {StyledButton} from '../../pages/Forum/BasicComponents'

interface IAvatarProps extends IUserData {
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
						avatar
							? `https://ya-praktikum.tech/api/v2/resources${avatar}`
							: 'src/components/Avatar/images/avatar.png'
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
