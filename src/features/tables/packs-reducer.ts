import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  isUpdatePackModalOpen: false,
  packForUpdate: '',
}

const slice = createSlice({
  name: 'packs',
  initialState: initialState,
  reducers: {
    toggleUpdatePackModal(state, action: PayloadAction<{ showModal: boolean; packId?: string }>) {
      state.isUpdatePackModalOpen = action.payload.showModal
      if (action.payload.packId) state.packForUpdate = action.payload.packId
    },
  },
})

export const packsReducer = slice.reducer
export const { toggleUpdatePackModal } = slice.actions
