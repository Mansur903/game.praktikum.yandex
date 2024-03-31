import {Navigate, Outlet} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'

import {useAppDispatch} from '../hooks'
import {setUser} from '../store/slices/user'

const ProtectedRoute = () => {
	const [status, setStatus] = useState(0)
	const dispatch = useAppDispatch()

	useEffect(() => {
		const fetchUser = async () => {
			await axios
				.get('https://ya-praktikum.tech/api/v2/auth/user', {withCredentials: true})
				.then((res) => {
					const user = res.data
					dispatch(setUser(user))
					setStatus(res.status)
				})
				.catch((e) => setStatus(e.response.status))
		}
		fetchUser()
	}, [])

	if (!status) {
		return <div>loading...</div>
	}

	if (status !== 200) {
		return (
			<Navigate
				replace
				to='/signin'
			/>
		)
	}
	return <Outlet />
}

export default ProtectedRoute
