import styles from './styles.module.scss'
import createTopicIcon from '../../../assets/create-topic-icon.png'
import '../../../styles/vars.scss'
import {StyledButton, StyledTextField} from '../BasicComponents'
import Typography from '@mui/material/Typography'
import {useNavigate} from 'react-router-dom'
import {PageInitArgs} from '../../../../routes'
import {fetchUserThunk, selectUser} from '../../../store/slices/user'

const CreateTopicPage = () => {
	const navigate = useNavigate()
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
						<h2 className={styles.header}></h2>
						<Typography
							className={styles.header}
							variant='h2'
							component='h2'>
							Название топика (Максимальная длина: 80)
						</Typography>
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
						<Typography
							className={styles.header}
							variant='h2'
							component='h2'>
							Комментарий
						</Typography>
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
						<StyledButton
							variant='outlined'
							sx={{margin: '40px 20px 0 0'}}>
							Создать
						</StyledButton>
					</div>
					<StyledButton
						variant='outlined'
						sx={{margin: '40px 20px 0 20px'}}
						onClick={() => navigate('/forum')}>
						Назад
					</StyledButton>
				</form>
			</div>
		</div>
	)
}

export const initCreateTopicPage = async ({dispatch, state}: PageInitArgs) => {
	if (!selectUser(state)) {
		return dispatch(fetchUserThunk())
	}
}

export default CreateTopicPage
