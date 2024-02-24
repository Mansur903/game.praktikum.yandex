import { createSlice } from '@reduxjs/toolkit'

export type User = {
  id: number
  login: string
}

type InitialStateProps = User & {
  isAuthenticated: boolean,
}

const initialState: InitialStateProps = {
  id: 0,
  login: '',
  isAuthenticated: false
}

export const userModel = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      // устанавливаем инфу о юзере в localStorage и в стейт
      console.log({state, payload})
    },

    clearUser: () => {
      // deleteUser()
      // deleteToken()
      // return initialState
    }
  }
})

export const { setUser, clearUser } = userModel.actions

export default userModel.reducer
