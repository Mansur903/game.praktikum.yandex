import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export type User = {
	password: string
	login: string
}

export interface IUserData {
	id?: number
	avatar?: string
	display_name?: string
	email?: string
	first_name?: string
	second_name?: string
	login?: string
	phone?: string
}

type InitialStateProps = User & {
	isAuthenticated: boolean
}

const initialState: InitialStateProps = {
	password: '',
	login: '',
	isAuthenticated: false
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
