import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import {RootState} from '../../store'
import axios from 'axios'

export type User = {
	password: string
	login: string
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

// export const fetchUserThunk = createAsyncThunk('user/fetchUserThunk', async (_: void) => {
// 	const url = `${SERVER_HOST}/user`
// 	return await fetch(url)
// 		.then((res) => res.json())
// 		.then((data) => data)
// })

// export const fetchUserThunk = createAsyncThunk('user/fetchUserThunk', async (_: void) => {
// 	// const url = `${SERVER_HOST}/user`
// 	return await axios
//     .get('https://ya-praktikum.tech/api/v2/auth/user', {withCredentials: true})
// })

export const fetchUserThunk = createAsyncThunk<User, undefined>(
	'user/fetchUserThunk',
	async () => {
		const response = await axios.get('https://ya-praktikum.tech/api/v2/auth/user', {
			withCredentials: true
		})
		console.log({response})
		return response.data
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
			.addCase(fetchUserThunk.fulfilled, (state, {payload}: PayloadAction<User>) => ({
				...state,
				data: payload,
				isAuthenticated: false,
				isLoading: true
			}))
			.addCase(fetchUserThunk.rejected, (state) => ({
				...state,
				isLoading: false
			}))
	}
})

export const {setUser, clearUser} = userModel.actions

export const selectUser = (state: RootState) => state.user.data

export default userModel.reducer
