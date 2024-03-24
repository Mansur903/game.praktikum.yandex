import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import {RootState} from '../../store'

export type User = {
	password: string
	login: string
}

type InitialStateProps = User & {
	isAuthenticated: boolean
}

const initialState: InitialStateProps = {
	password: '',
	login: '',
	isAuthenticated: false
}

export const fetchUserThunk = createAsyncThunk('user/fetchUserThunk', async (_: void) => {
	const url = `http://localhost:3001/user`
	return fetch(url).then((res) => res.json())
})

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

export const selectUser = (state: RootState) => state.user

export default userModel.reducer
