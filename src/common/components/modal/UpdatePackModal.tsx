import React, { useState } from 'react'

import { create, useModal } from '@ebay/nice-modal-react'

import { useLazyFetchCardsQuery } from '../../../features/cards'
import { useUpdatePackMutation } from '../../../features/packs'
import { useAutoFocus } from '../../hooks/useAutoFocus'
import { StyledDiv, StyledInput, StyledTitle } from '../../style/modal-styles'

import { ModalFC } from './ModalFC'

type Props = {
  prevName?: string
  cardsPack_id?: string
  insidePack?: boolean
}

export const UpdatePackModal = create(({ prevName, cardsPack_id, insidePack }: Props) => {
  const modal = useModal()
  const inputTagRef = useAutoFocus()
  const [updatePack, { isLoading: packIsUpdating }] = useUpdatePackMutation()
  const [value, setValue] = useState<string | undefined>(prevName)
  const [trigger] = useLazyFetchCardsQuery()
  const updatePackHandler = async () => {
    try {
      await updatePack({ cardsPack: { _id: cardsPack_id, name: value } })
      insidePack && trigger({ cardsPack_id: cardsPack_id })
      await modal.hide()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <ModalFC
      okText={'Save'}
      danger={false}
      isOpen={modal.visible}
      isLoading={packIsUpdating}
      handleOk={updatePackHandler}
      handleCancel={() => modal.hide()}
      afterClose={() => modal.remove()}
    >
      <div>
        <StyledTitle>Edit pack</StyledTitle>
        <hr />
        <StyledDiv>Name pack</StyledDiv>
        <StyledInput
          value={value}
          onChange={e => setValue(e.currentTarget.value)}
          placeholder="Enter name"
          bordered={false}
          autoFocus={true}
          ref={inputTagRef}
        />
        <hr />
      </div>
    </ModalFC>
  )
})
