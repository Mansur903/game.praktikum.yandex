import {Navigate, Outlet} from 'react-router-dom'

const ProtectedRoute = ({status}: {status: number}) => {
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
