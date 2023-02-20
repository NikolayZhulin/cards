import React from 'react'

import { AddNewPackModal } from '../../../features/tables/components/AddNewPackModal'
import { UpdatePackModal } from '../../../features/tables/components/UpdatePackModal'
import { useAppSelector } from '../../hooks/reduxHooks'

export const AppModals = () => {
  const showUpdatePackModal = useAppSelector(state => state.packs.isUpdatePackModalOpen)
  const showAddNewPackModal = useAppSelector(state => state.packs.isAddNewPackModalOpen)

  return (
    <>
      {showAddNewPackModal && <AddNewPackModal />}
      {showUpdatePackModal && <UpdatePackModal />}
    </>
  )
}
