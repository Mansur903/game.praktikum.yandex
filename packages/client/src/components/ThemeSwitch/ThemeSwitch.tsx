import {styled} from '@mui/material/styles'
import SwitchMui from '@mui/material/Switch'
import axios from 'axios'
import {FC, ReactNode, useCallback, useEffect, useState} from 'react'
import {ThemeContext} from '../ThemeContext/ThemeContext'
import {ThemeVariant} from '../../types/enum/Theme.enum'
type PropsType = {
	children: ReactNode
}
export const ThemeSwitch: FC<PropsType> = ({children}) => {
	const [theme, setTheme] = useState('light')

	const getTheme = useCallback(async () => {
		const deviceThemeId = localStorage.getItem('deviceThemeId')
		if (!deviceThemeId) {
			const result = await axios.put('/theme')
			if (result.data.id) localStorage.setItem('deviceThemeId', result.data.id)
		} else {
			try {
				const {data} = await axios.get(`/theme/${deviceThemeId}`)
				handleChangeTheme(data.theme_id.theme)
			} catch (e) {
				console.error(e)
			}
		}
	}, [])

	const handleChangeTheme = (theme: string) => {
		const root = document.getElementById('root')
		if (root) {
			root?.classList.remove(...root.classList)
			root?.classList.add(theme)
		}
		setTheme(theme)
	}

	const changeTheme = async () => {
		const deviceThemeId = localStorage.getItem('deviceThemeId')
		if (!deviceThemeId) {
			console.error('Missing local theme id')
			return
		}
		const code = theme === ThemeVariant.LIGHT ? ThemeVariant.DARK : ThemeVariant.LIGHT
		try {
			const {data} = await axios.post(`/theme`, {
				id: deviceThemeId,
				code
			})
			handleChangeTheme(data.theme_id.theme)
		} catch (e) {
			console.error(e)
		}
	}

	useEffect(() => {
		getTheme()
	}, [getTheme])

	return (
		<>
			<ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
			<SwitchStyled
				checked={theme !== ThemeVariant.LIGHT}
				onChange={changeTheme}
			/>
		</>
	)
}

export const SwitchStyled = styled(SwitchMui)(({theme}) => ({
	width: 62,
	top: 10,
	height: 34,
	padding: 7,
	display: 'flex',
	position: 'fixed',
	right: 10,
	opacity: 0.5,
	'&:hover': {
		opacity: 1
	},
	'& .MuiSwitch-switchBase': {
		margin: 1,
		padding: 0,
		transform: 'translateX(6px)',
		'&.Mui-checked': {
			color: '#fff',
			transform: 'translateX(22px)',
			'& .MuiSwitch-thumb:before': {
				backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
					'#fff'
				)}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`
			},
			'& + .MuiSwitch-track': {
				opacity: 1,
				backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be'
			}
		}
	},
	'& .MuiSwitch-thumb': {
		backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
		width: 32,
		height: 32,
		'&::before': {
			content: "''",
			position: 'absolute',
			width: '100%',
			height: '100%',
			left: 0,
			top: 0,
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
				'#fff'
			)}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`
		}
	},
	'& .MuiSwitch-track': {
		opacity: 1,
		backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
		borderRadius: 20 / 2
	}
}))
