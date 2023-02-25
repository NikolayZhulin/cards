import React, { useEffect, useState } from 'react'

import { create, useModal } from '@ebay/nice-modal-react'

import { useUpdatePackMutation } from '../../../features/packs'
import { StyledDiv, StyledInput, StyledTitle } from '../../style/modal-styles'

import { ModalFC } from './ModalFC'

type Props = {
  prevName?: string
  cardsPack_id?: string
}

export const UpdatePackModal = create(({ prevName, cardsPack_id }: Props) => {
  const modal = useModal()
  const [updatePack, { isLoading: packIsUpdating }] = useUpdatePackMutation()
  const [value, setValue] = useState<string | undefined>(prevName)

  const updatePackHandler = async () => {
    await updatePack({ cardsPack: { _id: cardsPack_id, name: value } }).unwrap()
    modal.hide()
    setValue('')
  }

  useEffect(() => setValue(prevName), [prevName])

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
        />
        <hr />
      </div>
    </ModalFC>
  )
})
