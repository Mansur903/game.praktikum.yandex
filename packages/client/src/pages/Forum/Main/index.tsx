import styles from './styles.module.scss'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import topicIcon from '../../../assets/topic-icon.png'
import {StyledTableRowCell, StyledTableHead, StyledButton} from '../BasicComponents'
import {useNavigate} from 'react-router-dom'
import {PageInitArgs} from '../../../../routes'
import {fetchUserThunk, selectUser} from '../../../entities/user'

function createData(topic: string, comments: number) {
	return {topic, comments}
}

const rows = [
	createData('Frozen yoghurt', 12),
	createData('Ice cream sandwich', 16),
	createData('Eclair', 12),
	createData('Cupcake', 11),
	createData('Gingerbread', 9)
]

const ForumMain = () => {
	const navigate = useNavigate()

	return (
		<div className={styles.wrapper}>
			<div className={styles.page}>
				<Typography
					className={styles.page__header}
					variant='h1'
					component='h1'>
					Форум
				</Typography>

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
								<StyledTableRowCell align='center'>Топики</StyledTableRowCell>
								<StyledTableRowCell align='center'>Комментарии</StyledTableRowCell>
							</TableRow>
						</StyledTableHead>
						<TableBody>
							{rows.map((row) => (
								<TableRow
									key={row.topic}
									sx={{'&:last-child td, &:last-child th': {border: 0}}}>
									<TableCell
										component='th'
										scope='row'
										align='center'
										sx={{padding: '25px'}}>
										<div className={styles.page__topicTitleWrapper}>
											<img
												alt='иконка'
												className={styles.page__topicIcon}
												src={topicIcon}></img>
											<div className={styles.page__topicTitle}>{row.topic}</div>
										</div>
									</TableCell>
									<TableCell
										align='center'
										sx={{
											position: 'relative'
										}}>
										<div className={styles.page__comments}>{row.comments}</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<div>
					<StyledButton
						variant='outlined'
						sx={{margin: '20px 20px 0 0'}}
						onClick={() => navigate('/')}>
						На главную
					</StyledButton>

					<StyledButton
						variant='outlined'
						sx={{margin: '20px 20px 0 0'}}
						onClick={() => navigate('/create-topic')}>
						Создать топик
					</StyledButton>

					<StyledButton
						variant='outlined'
						sx={{margin: '20px 20px 0 0'}}
						onClick={() => navigate('/topic')}>
						Страница топика
					</StyledButton>
				</div>
			</div>
		</div>
	)
}

export const initForumPage = async ({dispatch, state}: PageInitArgs) => {
	if (!selectUser(state)) {
		return dispatch(fetchUserThunk())
	}
}
export default ForumMain
