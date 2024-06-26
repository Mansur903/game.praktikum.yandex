import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userReducer from './slices/user/model'
import {ssrReducer} from './slices/ssrSlice/ssrSlice'

export const reducer = combineReducers({
	user: userReducer,
	ssr: ssrReducer
})

declare global {
	interface Window {
		APP_INITIAL_STATE: RootState
	}
}

export const store = configureStore({
	reducer,
	preloadedState: typeof window === 'undefined' ? undefined : window?.APP_INITIAL_STATE
})

export type RootState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch
export default store
