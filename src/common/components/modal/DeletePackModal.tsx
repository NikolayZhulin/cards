import React from 'react'

import { create, useModal } from '@ebay/nice-modal-react'
import { useNavigate } from 'react-router-dom'

import { useDeletePackMutation } from '../../../features/packs'
import { StyledTitle } from '../../style/modal-styles'
import { PATH } from '../../utils'

import { ModalFC } from './ModalFC'

type Props = {
  cardsPack_id?: string
  packName?: string
  insidePack?: boolean
}

export const DeletePackModal = create(({ cardsPack_id, packName, insidePack }: Props) => {
  const modal = useModal()
  const [deletePack, { isLoading: packIsDeleting }] = useDeletePackMutation()
  const navigate = useNavigate()

  const deletePackHandler = async () => {
    try {
      await deletePack(cardsPack_id as string)
      insidePack && navigate(PATH.PACKS_LIST)
      await modal.hide()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <ModalFC
      okText={'Delete'}
      danger={true}
      isOpen={modal.visible}
      isLoading={packIsDeleting}
      handleOk={deletePackHandler}
      handleCancel={() => modal.hide()}
      afterClose={() => modal.remove()}
    >
      <div>
        <StyledTitle>Delete pack</StyledTitle>
        <hr />
        <div>
          Do yo really want to remove <b>{packName}</b>?
        </div>
        <div>All cards will be deleted.</div>
      </div>
    </ModalFC>
  )
})
