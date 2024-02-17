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

const StyledTableHead = styled(TableHead)(() => ({
	backgroundColor: 'rgb(107 136 254 / 50%)'
}))

const StyledTableRowCell = styled(TableCell)(() => ({
	color: '#f0f0f0',
	fontWeight: 'bold',
	fontSize: '24px'
}))

const ForumMain = () => {
	console.log(topicIcon)
	return (
		<div className={styles.wrapper}>
			<div className={styles.page}>
				<h1 className={styles.page__header}>Форум</h1>
				<TableContainer
					component={Paper}
					sx={{
						borderRadius: '20px',
						marginTop: '40px'
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
			</div>
		</div>
	)
}
export default ForumMain
