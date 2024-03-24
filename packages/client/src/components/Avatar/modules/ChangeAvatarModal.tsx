import React from 'react'
import styles from './styles.module.scss'
import Button from '@mui/material/Button'
import {styled} from '@mui/material/styles'
import {StyledButton} from '../../../pages/Forum/BasicComponents'

const StyledInput = styled('input')({
	display: 'none'
})

const StyledLabel = styled('label')({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '10px 20px',
	borderRadius: '10px',
	border: '1px solid transparent',
	color: '#f0f0f0',
	cursor: 'pointer',
	'&:hover': {
		borderColor: 'var(--white)'
	}
})

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

					<StyledInput
						type='file'
						onChange={onInputChange}
						id='avatarInput'
					/>

					<StyledLabel htmlFor='avatarInput'>Выберите файл</StyledLabel>

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
