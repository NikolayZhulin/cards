import { CardType } from '../../cards'
import { State } from '../learn-reducer'

export const clearState = (state: State) => {
  state.packName = ''
  state.handledCards = {}
  state.ids = {}
  state.grades = []
  state.randomCard = {} as CardType
}
