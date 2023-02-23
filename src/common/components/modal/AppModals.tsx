import React from 'react'

import { AddNewCardModal } from './AddNewCardModal'
import { AddNewPackModal } from './AddNewPackModal'
import { DeleteCardModal } from './DeleteCardModal'
import { DeletePackModal } from './DeletePackModal'
import { UpdateCardModal } from './UpdateCardModal'
import { UpdatePackModal } from './UpdatePackModal'

export const AppModals = () => {
  return (
    <>
      <AddNewPackModal />
      <AddNewCardModal />
      <UpdatePackModal />
      <UpdateCardModal />
      <DeletePackModal />
      <DeleteCardModal />
    </>
  )
}
