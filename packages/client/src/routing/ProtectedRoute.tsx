import {Navigate, Outlet} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'

const ProtectedRoute = () => {
	const [status, setStatus] = useState(0)
	useEffect(() => {
		const fetchUser = async () => {
			await axios
				.get('https://ya-praktikum.tech/api/v2/auth/user', {withCredentials: true})
				.then((res) => {
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
