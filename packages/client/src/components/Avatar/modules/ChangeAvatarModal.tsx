import React from 'react'
import styles from './styles.module.scss'
import Button from '@mui/material/Button'
import {styled} from '@mui/material/styles'
import {StyledButton} from '../../../pages/Forum/BasicComponents'

interface IChangeAvatarModalProps {
	onLoadButtonClick: () => void
	onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	onCloseButtonClick: () => void
}

const ChangeAvatarModal: React.FC<IChangeAvatarModalProps> = ({
	onLoadButtonClick,
	onInputChange,
	onCloseButtonClick
}: IChangeAvatarModalProps) => {
	return (
		<>
			<div className={styles.modal__overlay}>
				<div className={styles.modal__body}>
					<StyledButton
						onClick={onCloseButtonClick}
						id={styles.closeBtn}>
						Закрыть
					</StyledButton>

					<input
						type='file'
						onChange={onInputChange}
						id='avatarInput'
					/>

					<StyledButton
						variant='outlined'
						onClick={onLoadButtonClick}>
						Загрузить
					</StyledButton>
				</div>
			</div>
		</>
	)
}

export default ChangeAvatarModal
