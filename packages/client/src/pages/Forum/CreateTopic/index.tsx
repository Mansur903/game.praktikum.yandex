import styles from './styles.module.scss'
import createTopicIcon from '../../../assets/create-topic-icon.png'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {styled} from '@mui/material/styles'

const CreateTopicPage = () => {
	const StyledTextField = styled(TextField)(() => ({
		'.MuiInputBase-root': {
			borderRadius: '20px',
			backgroundColor: '#f0f0f0',
			marginTop: '10px'
		},
		'.MuiOutlinedInput-notchedOutline': {
			borderColor: '#f0f0f0'
		},
		'.MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline': {
			borderColor: 'white'
		}
	}))

	const StyledButton = styled(Button)(() => ({
		color: '#f0f0f0',
		borderRadius: '10px',
		borderColor: '#f0f0f0',
		'&:hover': {
			borderColor: '#fff'
		},
		margin: '40px 20px 0 0'
	}))

	return (
		<div className={styles.wrapper}>
			<div className={styles.page}>
				<div className={styles.page__headerWrapper}>
					<img
						src={createTopicIcon}
						className={styles.page__headerIcon}
						alt='иконка'></img>
					<h1 className={styles.page__header}>Создать новый топик</h1>
				</div>

				<form className={styles.page__form}>
					<div className={styles.page__textFieldWrapper}>
						<h2 className={styles.header}>Название топика (Максимальная длина: 80)</h2>
						<StyledTextField
							id='outlined-basic'
							variant='outlined'
							sx={{
								width: '80%',
								'.MuiInputBase-root': {
									height: '50px'
								}
							}}
						/>
					</div>

					<div className={styles.page__textFieldWrapper}>
						<h2 className={styles.header}>Комментарий</h2>
						<StyledTextField
							id='outlined-multiline-static'
							multiline
							rows={4}
							sx={{
								width: '100%'
							}}
						/>
					</div>

					<div className={styles.page__buttonWrapper}>
						<StyledButton variant='outlined'>Создать</StyledButton>
					</div>
				</form>
			</div>
		</div>
	)
}
export default CreateTopicPage
