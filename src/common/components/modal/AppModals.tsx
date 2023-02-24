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
      {/*<AddNewPackModal id={'add-pack-modal'} />*/}
      <AddNewCardModal id={'add-card-modal'} />
      <UpdatePackModal id={'update-pack-modal'} />
      <UpdateCardModal id={'update-card-modal'} />
      <DeletePackModal id={'delete-pack-modal'} />
      <DeleteCardModal id={'delete-card-modal'} />
    </>
  )
}
