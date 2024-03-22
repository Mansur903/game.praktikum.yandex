import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export type User = {
	password: string
	login: string
	avatar: null | string
}

type InitialStateProps = User & {
	isAuthenticated: boolean
}

const initialState: InitialStateProps = {
	password: '',
	login: '',
	isAuthenticated: false,
	avatar: null
}

export const userModel = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, {payload}: PayloadAction<User | InitialStateProps>) => ({
			...state,
			...payload,
			isAuthenticated: true
		}),

		clearUser: () => initialState
	}
})

export const {setUser, clearUser} = userModel.actions

export default userModel.reducer
