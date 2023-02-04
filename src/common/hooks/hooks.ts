import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState, store } from '../../app/store'

export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
