import { RootState } from '../../../app/store'

export const packNameSelector = (state: RootState) => state.learn.packName

export const randomCardSelector = (state: RootState) => state.learn.randomCard
