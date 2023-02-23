import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  isUpdatePackModalOpen: false,
  isAddNewPackModalOpen: false,
  isDeletePackModalOpen: false,
  packForUpdate: { id: '', name: '' },
  packForDelete: { id: '', name: '', insidePack: false },
}

const slice = createSlice({
  name: 'packs',
  initialState: initialState,
  reducers: {
    toggleUpdatePackModal(state, action: PayloadAction<{ showModal: boolean }>) {
      state.isUpdatePackModalOpen = action.payload.showModal
    },
    toggleAddNewPackModal(state, action: PayloadAction<{ showModal: boolean }>) {
      state.isAddNewPackModalOpen = action.payload.showModal
    },
    toggleDeletePackModal(state, action: PayloadAction<{ showModal: boolean }>) {
      state.isDeletePackModalOpen = action.payload.showModal
    },
    savePackForUpdate(state, action: PayloadAction<{ packId?: string; name?: string }>) {
      if (action.payload.packId) state.packForUpdate.id = action.payload.packId
      if (action.payload.name) state.packForUpdate.name = action.payload.name
    },
    savePackForDelete(
      state,
      action: PayloadAction<{ packId?: string; name?: string; insidePack?: boolean }>
    ) {
      if (action.payload.packId) state.packForDelete.id = action.payload.packId
      if (action.payload.name) state.packForDelete.name = action.payload.name
      if (action.payload.insidePack) state.packForDelete.insidePack = action.payload.insidePack
    },
  },
})

export const packsReducer = slice.reducer
export const {
  toggleUpdatePackModal,
  toggleAddNewPackModal,
  toggleDeletePackModal,
  savePackForUpdate,
  savePackForDelete,
} = slice.actions
