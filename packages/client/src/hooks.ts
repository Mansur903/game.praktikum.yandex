import type {TypedUseSelectorHook} from 'react-redux'
import {useDispatch, useSelector, useStore} from 'react-redux'
import type {AppDispatch, RootState, store} from './store'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => typeof store = useStore
