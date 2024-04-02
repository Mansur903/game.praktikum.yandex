import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import {RootState} from '../../store'
import axios from 'axios'

export type User = {
	avatar: string | null
	display_name: string | null
	email: string
	first_name: string
	id: number
	login: string
	phone: string
	second_name: string
}

type InitialStateProps = {
	data: User | null
	isAuthenticated: boolean
	isLoading: boolean
}

const initialState: InitialStateProps = {
	data: null,
	isAuthenticated: false,
	isLoading: false
}

export const fetchUserThunk = createAsyncThunk<User | null>(
	'user/fetchUserThunk',
	async () => {
		const {data} = await axios.get<User | null>(
			'https://ya-praktikum.tech/api/v2/auth/user',
			{
				withCredentials: true
			}
		)
		return data
	}
)

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
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserThunk.pending, (state) => ({
				...state,
				data: null,
				isAuthenticated: false,
				isLoading: true
			}))
			.addCase(
				fetchUserThunk.fulfilled,
				(state, {payload}: PayloadAction<User | null>) => ({
					...state,
					data: payload,
					isAuthenticated: false,
					isLoading: true
				})
			)
			.addCase(fetchUserThunk.rejected, (state) => ({
				...state,
				isLoading: false
			}))
	}
})

export const {setUser, clearUser} = userModel.actions

export const selectUser = (state: RootState) => state.user.data

export default userModel.reducer
