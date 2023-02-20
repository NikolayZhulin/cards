import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  isAddNewCardModalOpen: false,
  isDeleteCardModalOpen: false,
  packIdForNewCard: '',
  cardForDelete: { id: '', question: '' },
}

const slice = createSlice({
  name: 'cards',
  initialState: initialState,
  reducers: {
    toggleAddNewCardModal(state, action: PayloadAction<{ showModal: boolean }>) {
      state.isAddNewCardModalOpen = action.payload.showModal
    },
    toggleDeleteCardModal(state, action: PayloadAction<{ showModal: boolean }>) {
      state.isDeleteCardModalOpen = action.payload.showModal
    },
    savePackIdForNewCard(state, action: PayloadAction<{ packId?: string }>) {
      if (action.payload.packId) state.packIdForNewCard = action.payload.packId
    },
    saveCardForDelete(state, action: PayloadAction<{ id?: string; question?: string }>) {
      if (action.payload.id) state.cardForDelete.id = action.payload.id
      if (action.payload.question) state.cardForDelete.question = action.payload.question
    },
  },
})

export const cardsReducer = slice.reducer
export const {
  toggleAddNewCardModal,
  toggleDeleteCardModal,
  savePackIdForNewCard,
  saveCardForDelete,
} = slice.actions
