import {Navigate, Outlet, useLocation, useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'

const ProtectedRoute = () => {
	const [status, setStatus] = useState(0)
	const {search} = useLocation()
	const navigate = useNavigate()
	useEffect(() => {
		const fetchUser = async () => {
			await axios
				.get('https://ya-praktikum.tech/api/v2/auth/user', {withCredentials: true})
				.then((res) => {
					setStatus(res.status)
				})
				.catch((e) => setStatus(e.response.status))
		}

		const oauthLogin = async (code: string) => {
			await axios
				.post(
					'https://ya-praktikum.tech/api/v2/oauth/yandex',
					{
						code: code,
						redirect_uri: window.location.origin
					},
					{
						withCredentials: true,
						headers: {
							Accept: 'application/json',
							'Content-type': 'application/json'
						}
					}
				)
				.then((res) => {
					navigate('/', {replace: true})
					setStatus(res.status)
				})
				.catch((e) => setStatus(e.response.status))
		}

		const params = new URLSearchParams(search)
		const code = params.get('code')

		if (code) {
			oauthLogin(code)
		} else {
			fetchUser()
		}
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
