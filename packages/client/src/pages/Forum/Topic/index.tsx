import styles from './styles.module.scss'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import {styled} from '@mui/material/styles'
import topicIcon from '../../../assets/topic-icon.png'
import defaultAvatar from '../../../assets/default-avatar.png'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

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

const StyledTableHead = styled(TableHead)(() => ({
	backgroundColor: 'rgb(107 136 254 / 50%)'
}))

const StyledTableRowCell = styled(TableCell)(() => ({
	color: '#f0f0f0',
	fontWeight: 'bold',
	fontSize: '24px'
}))

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
	margin: '20px 20px 0 0'
}))

const Topic = () => {
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
										/>
										<div className={styles.topic__authorName}>Автор: Иван Иванов</div>
									</div>
								</div>

								<div className={styles.topic__descriptionBlock}>
									<article className={styles.topic__description}>Описание топика</article>
								</div>
							</section>

							<div className={styles.page__commentsDivider}>
								<div className={styles.dividerText}>Комментарии</div>
							</div>

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
					<StyledButton variant='outlined'>Назад</StyledButton>
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
export default Topic
