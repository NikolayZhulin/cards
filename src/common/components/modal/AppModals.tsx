import React from 'react'

import { AddNewCardModal } from '../../../features/tables/components/AddNewCardModal'
import { AddNewPackModal } from '../../../features/tables/components/AddNewPackModal'
import { DeleteCardModal } from '../../../features/tables/components/DeleteCardModal'
import { DeletePackModal } from '../../../features/tables/components/DeletePackModal'
import { UpdateCardModal } from '../../../features/tables/components/UpdateCardModal'
import { UpdatePackModal } from '../../../features/tables/components/UpdatePackModal'

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
