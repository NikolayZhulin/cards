import React from 'react'

import { useNavigate } from 'react-router-dom'

import { toggleDeletePackModal } from '../../../features/packs/packs-reducer'
import { useDeletePackMutation } from '../../../features/tables/tablesApi'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { PATH } from '../../utils'

import { ModalFC } from './ModalFC'

export const DeletePackModal = () => {
  const showModal = useAppSelector(state => state.packs.isDeletePackModalOpen)
  const id = useAppSelector(state => state.packs.packForDelete.id)
  const packName = useAppSelector(state => state.packs.packForDelete.name)
  const insidePack = useAppSelector(state => state.packs.packForDelete.insidePack)
  const [deletePack, { isLoading: packIsDeleting }] = useDeletePackMutation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const closeModal = () => dispatch(toggleDeletePackModal({ showModal: false }))

  const deletePackHandler = async () => {
    try {
      await deletePack(id).unwrap()
      closeModal()
      insidePack && navigate(PATH.PACKS_LIST)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <ModalFC
      okText={'Delete'}
      danger={true}
      isOpen={showModal}
      isLoading={packIsDeleting}
      handleOk={deletePackHandler}
      handleCancel={closeModal}
    >
      <div>
        <h3>Delete pack</h3>
        <hr />
        <div>
          Do yo really want to remove <b>{packName}</b>?
        </div>
        <div>All cards will be deleted.</div>
      </div>
    </ModalFC>
  )
}
