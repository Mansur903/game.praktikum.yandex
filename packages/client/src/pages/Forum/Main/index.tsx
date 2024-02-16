import styles from './styles.module.scss'
import {useEffect, useState} from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import {styled} from '@mui/material/styles'
import topicIcon from '../../../assets/topic-icon.png'

function createData(
	name: string,
	calories: number,
	fat: number,
	carbs: number,
	protein: number
) {
	return {name, calories, fat, carbs, protein}
}

const rows = [
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	createData('Eclair', 262, 16.0, 24, 6.0),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Gingerbread', 356, 16.0, 49, 3.9)
]

// моковые данные
// const topiks = [
//   {
//     name: 'Первый топик',
//     commentsCount: 12,
//     lastCommentDate: '16.02.2024',
//     username: 'Vivian Suarez',
//     photo: 'path/to/photo'
//   }
// ]
// const server = {
//   getLeaders() {
//     return new Promise(resolve => {
//       setTimeout(() => resolve(topiks), 150)
//     })
//   },
// }

// interface ITopik {
//   name: string
//   commentsCount: number
//   lastCommentDate: string
//   username: string
//   photo: string
// }

const StyledTableHead = styled(TableHead)(() => ({
	backgroundColor: 'rgb(107 136 254 / 50%)'
	// [`&.${tableCellClasses.body}`]: {
	//   fontSize: 14,
	// },
}))

const StyledTableRowCell = styled(TableCell)(() => ({
	color: '#f0f0f0',
	fontWeight: 'bold',
	fontSize: '24px'
}))

const StyledTableCell = styled(TableCell)(() => ({
	display: 'flex',
	alignItems: 'center'
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
						borderRadius: '20px'
					}}>
					<Table
						sx={{minWidth: 650}}
						aria-label='simple table'>
						<StyledTableHead>
							<TableRow>
								<StyledTableRowCell>Топики</StyledTableRowCell>
								<StyledTableRowCell align='right'>Комментарии</StyledTableRowCell>
								<StyledTableRowCell align='right'>
									Последний комментарий
								</StyledTableRowCell>
							</TableRow>
						</StyledTableHead>
						<TableBody>
							{rows.map((row) => (
								<TableRow
									key={row.name}
									sx={{'&:last-child td, &:last-child th': {border: 0}}}>
									<StyledTableCell
										component='th'
										scope='row'>
										<img src={topicIcon}></img>
										{row.name}
									</StyledTableCell>
									<TableCell align='right'>{row.calories}</TableCell>
									<TableCell align='right'>{row.fat}</TableCell>
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
