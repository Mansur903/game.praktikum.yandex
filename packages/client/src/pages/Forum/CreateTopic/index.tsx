import styles from './styles.module.scss'
import createTopicIcon from '../../../assets/create-topic-icon.png'
import TextField from '@mui/material/TextField'

const CreateTopicPage = () => {
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
					<TextField
						id='outlined-basic'
						variant='outlined'
						sx={{
							'.MuiInputBase-root': {
								borderRadius: '20px',
								backgroundColor: '#f0f0f0'
							},
							'.MuiOutlinedInput-notchedOutline': {
								borderColor: '#f0f0f0'
							},
							'.MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline': {
								borderColor: 'white'
							}
						}}
					/>
				</form>
			</div>
		</div>
	)
}
export default CreateTopicPage
