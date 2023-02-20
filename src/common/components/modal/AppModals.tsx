import React from 'react'

import { AddNewPackModal } from '../../../features/tables/components/AddNewPackModal'
import { DeletePackModal } from '../../../features/tables/components/DeletePackModal'
import { UpdatePackModal } from '../../../features/tables/components/UpdatePackModal'

export const AppModals = () => {
  return (
    <>
      <AddNewPackModal />
      <UpdatePackModal />
      <DeletePackModal />
    </>
  )
}
