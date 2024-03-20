import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userReducer from './entities/user/model'

const rootReducer = combineReducers({
	user: userReducer
})

export const createStore = (preloadedState?: RootState) =>
	configureStore({reducer: rootReducer, preloadedState})

type Store = ReturnType<typeof createStore>

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = Store['dispatch']
