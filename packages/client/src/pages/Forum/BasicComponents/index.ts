import {styled} from '@mui/material/styles'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import '../../../styles/vars.scss'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'

export const StyledButton = styled(Button)(() => ({
	color: '#f0f0f0',
	borderRadius: '10px',
	borderColor: 'var(--background)',
	'&:hover': {
		borderColor: 'var(--white)'
	}
}))

export const StyledTextField = styled(TextField)(() => ({
	'.MuiInputBase-root': {
		borderRadius: '20px',
		backgroundColor: 'var(--background)',
		marginTop: '10px'
	},
	'.MuiOutlinedInput-notchedOutline': {
		borderColor: 'var(--background)'
	},
	'.MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline': {
		borderColor: 'var(--white)'
	}
}))

export const StyledTableRowCell = styled(TableCell)(() => ({
	color: '#f0f0f0',
	fontWeight: 'bold',
	fontSize: '24px'
}))

export const StyledTableHead = styled(TableHead)(() => ({
	backgroundColor: 'rgb(107 136 254 / 50%)'
}))
