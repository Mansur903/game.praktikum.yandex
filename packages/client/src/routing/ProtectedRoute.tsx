import {Navigate, Outlet, useLocation, useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {BASE_URL, OAUTH_REDIRECT_URI, OAUTH_YANDEX} from '../config/api'

import {useAppDispatch} from '../hooks'
import {setUser} from '../store/slices/user'

const ProtectedRoute = () => {
	const [status, setStatus] = useState(0)
	const {search} = useLocation()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	useEffect(() => {
		const fetchUser = async () => {
			await axios
				.get(`${BASE_URL}auth/user`, {withCredentials: true})
				.then((res) => {
					setStatus(res.status)
				})
				.catch((e) => setStatus(e.response.status))
		}

		const oauthLogin = async (code: string) => {
			await axios
				.post(
					`${BASE_URL}${OAUTH_YANDEX}`,
					{
						code: code,
						redirect_uri: OAUTH_REDIRECT_URI
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
					const user = res.data
					dispatch(setUser(user))
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
