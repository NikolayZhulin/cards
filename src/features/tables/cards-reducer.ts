import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  isAddNewCardModalOpen: true,
  packIdForNewCard: '',
}

const slice = createSlice({
  name: 'cards',
  initialState: initialState,
  reducers: {
    toggleAddNewCardModal(state, action: PayloadAction<{ showModal: boolean }>) {
      state.isAddNewCardModalOpen = action.payload.showModal
    },
    savePackIdForNewCard(state, action: PayloadAction<{ packId?: string }>) {
      if (action.payload.packId) state.packIdForNewCard = action.payload.packId
    },
  },
})

export const cardsReducer = slice.reducer
export const { toggleAddNewCardModal, savePackIdForNewCard } = slice.actions
