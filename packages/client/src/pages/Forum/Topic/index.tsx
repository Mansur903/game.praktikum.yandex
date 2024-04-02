import styles from './styles.module.scss'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import topicIcon from '../../../assets/topic-icon.png'
import defaultAvatar from '../../../assets/default-avatar.png'
import {useNavigate} from 'react-router-dom'
import {
	StyledButton,
	StyledTextField,
	StyledTableRowCell,
	StyledTableHead
} from '../BasicComponents'
import {PageInitArgs} from '../../../../routes'
import {fetchUserThunk, selectUser} from '../../../store/slices/user'

const rows = [
	{
		image: defaultAvatar,
		name: 'Иван Иванов',
		comment: 'Комментарий 1',
		id: 1
	},
	{
		image: defaultAvatar,
		name: 'Иван Иванов',
		comment: 'Комментарий 2',
		id: 2
	},
	{
		image: defaultAvatar,
		name: 'Иван Иванов',
		comment: 'Комментарий 3',
		id: 3
	}
]

const Topic = () => {
	const navigate = useNavigate()

	return (
		<div className={styles.wrapper}>
			<div className={styles.page}>
				<TableContainer
					component={Paper}
					sx={{
						borderRadius: '20px',
						marginTop: '20px'
					}}>
					<Table
						sx={{minWidth: 650}}
						aria-label='simple table'>
						<StyledTableHead>
							<TableRow>
								<StyledTableRowCell>Топик</StyledTableRowCell>
							</TableRow>
						</StyledTableHead>

						<TableBody>
							<TableRow>
								<TableCell sx={{padding: 0}}>
									<section className={styles.topic}>
										<div className={styles.topic__authorBlock}>
											<article className={styles.topic__topicName}>
												<img
													alt='иконка'
													className={styles.page__topicIcon}
													src={topicIcon}></img>
												<div className={styles.topicName}>Название топика</div>
											</article>

											<div className={styles.topic__author}>
												<img
													src={defaultAvatar}
													className={styles.topic__photo}
													alt='аватар'
												/>
												<div className={styles.topic__authorName}>Автор: Иван Иванов</div>
											</div>
										</div>

										<div className={styles.topic__descriptionBlock}>
											<article className={styles.topic__description}>
												Описание топика
											</article>
										</div>
									</section>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell sx={{padding: 0}}>
									<div className={styles.page__commentsDivider}>
										<div className={styles.dividerText}>Комментарии</div>
									</div>
								</TableCell>
							</TableRow>

							{rows.map((row) => (
								<TableRow key={row.id}>
									<TableCell
										component='th'
										scope='row'
										sx={{padding: '0px'}}>
										<section className={styles.topic}>
											<div className={styles.topic__authorBlock}>
												<div className={styles.topic__author}>
													<img
														src={defaultAvatar}
														className={styles.topic__photo}
														alt='аватар'
													/>
													<div className={styles.topic__authorName}>{row.name}</div>
												</div>
											</div>

											<div className={styles.topic__descriptionBlock}>
												<article className={styles.topic__description}>
													{row.comment}
												</article>
											</div>
										</section>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>

				<StyledTextField
					id='outlined-multiline-static'
					multiline
					rows={4}
					placeholder='Напишите свой комментарий...'
					sx={{
						width: '100%'
					}}
				/>

				<div className={styles.page__buttonWrapper}>
					<StyledButton
						variant='outlined'
						sx={{margin: '20px 20px 0 0'}}
						onClick={() => navigate('/forum')}>
						Назад
					</StyledButton>

					<StyledButton
						variant='outlined'
						sx={{margin: '20px 0 0 0'}}>
						Отправить комментарий
					</StyledButton>
				</div>
			</div>
		</div>
	)
}

export const initTopicPage = async ({dispatch, state}: PageInitArgs) => {
	if (!selectUser(state)) {
		return dispatch(fetchUserThunk())
	}
}

export default Topic
