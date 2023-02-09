import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../common/hooks/hooks'

import type { RootState } from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
