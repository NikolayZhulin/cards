import React from 'react'

import { useAppDispatch, useAppSelector } from '../../../../common/hooks/reduxHooks'
import { UpdatePackModal } from '../../components/UpdatePackModal'
import { TablePageStyle } from '../../styles'

import { PacksListBlocks } from './pack-list-blocks'

export const PacksList = () => {
  const showModal = useAppSelector(state => state.packs.isUpdatePackModalOpen)

  return (
    <TablePageStyle>
      {showModal && <UpdatePackModal />}
      <PacksListBlocks />
    </TablePageStyle>
  )
}
