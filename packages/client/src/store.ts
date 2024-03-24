import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userReducer from './entities/user/model'

const reducer = combineReducers({
	user: userReducer
})

declare global {
	interface Window {
		APP_INITIAL_STATE: RootState
	}
}

export const store = configureStore({
	reducer,
	preloadedState: typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE
})

export type RootState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch
export default store
