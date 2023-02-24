import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  isAddNewCardModalOpen: false,
  isDeleteCardModalOpen: false,
  isUpdateCardModalOpen: false,
  packIdForNewCard: '',
  cardForDelete: { id: '', question: '' },
  cardForUpdate: { id: '', question: '', answer: '', format: 'text' },
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
    toggleUpdateCardModal(state, action: PayloadAction<{ showModal: boolean }>) {
      state.isUpdateCardModalOpen = action.payload.showModal
    },
    savePackIdForNewCard(state, action: PayloadAction<{ packId?: string }>) {
      if (action.payload.packId) state.packIdForNewCard = action.payload.packId
    },
    saveCardForDelete(state, action: PayloadAction<{ id?: string; question?: string }>) {
      if (action.payload.id) state.cardForDelete.id = action.payload.id
      if (action.payload.question) state.cardForDelete.question = action.payload.question
    },
    saveCardForUpdate(
      state,
      action: PayloadAction<{
        id: string
        question: string
        answer: string
        format?: 'text' | 'image'
      }>
    ) {
      state.cardForUpdate.id = action.payload.id
      state.cardForUpdate.question = action.payload.question
      state.cardForUpdate.answer = action.payload.answer
      if (action.payload.format) state.cardForUpdate.format = action.payload.format
    },
  },
})

export const cardsReducer = slice.reducer
export const {
  toggleAddNewCardModal,
  toggleDeleteCardModal,
  savePackIdForNewCard,
  saveCardForDelete,
  toggleUpdateCardModal,
  saveCardForUpdate,
} = slice.actions
