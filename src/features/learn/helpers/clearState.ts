import { CardType } from '../../tables'
import { State } from '../learn-reducer-copy'

export const clearState = (state: State) => {
  state.packName = ''
  state.handledCards = {}
  state.ids = {}
  state.grades = []
  state.randomCard = {} as CardType
}
