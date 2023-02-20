import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  isUpdatePackModalOpen: false,
  isAddNewPackModalOpen: false,
  packIdForUpdate: '',
  packNameForUpdate: '',
}

const slice = createSlice({
  name: 'packs',
  initialState: initialState,
  reducers: {
    toggleUpdatePackModal(state, action: PayloadAction<{ showModal: boolean }>) {
      state.isUpdatePackModalOpen = action.payload.showModal
    },
    savePackIdForUpdate(state, action: PayloadAction<{ packId?: string }>) {
      if (action.payload.packId) state.packIdForUpdate = action.payload.packId
    },
    savePackNameForUpdate(state, action: PayloadAction<{ name?: string }>) {
      if (action.payload.name) state.packNameForUpdate = action.payload.name
    },
    toggleAddNewPackModal(state, action: PayloadAction<{ showModal: boolean }>) {
      state.isAddNewPackModalOpen = action.payload.showModal
    },
  },
})

export const packsReducer = slice.reducer
export const {
  toggleUpdatePackModal,
  savePackIdForUpdate,
  savePackNameForUpdate,
  toggleAddNewPackModal,
} = slice.actions
