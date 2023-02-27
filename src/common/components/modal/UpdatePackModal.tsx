import React, { useState } from 'react'

import { create, useModal } from '@ebay/nice-modal-react'
import { Input } from 'antd'

import { useLazyFetchCardsQuery } from '../../../features/cards'
import { useUpdatePackMutation } from '../../../features/packs'
import { useAutoFocus } from '../../hooks/useAutoFocus'

import { ModalFC } from './ModalFC'

type Props = {
  prevName?: string
  cardsPack_id?: string
}

export const UpdatePackModal = create(({ prevName, cardsPack_id }: Props) => {
  const modal = useModal()
  const [updatePack, { isLoading: packIsUpdating }] = useUpdatePackMutation()
  const [value, setValue] = useState<string | undefined>(prevName)
  const [trigger, response] = useLazyFetchCardsQuery()
  const inputTagRef = useAutoFocus()
  const updatePackHandler = async () => {
    await updatePack({ cardsPack: { _id: cardsPack_id, name: value } })
    trigger({ cardsPack_id: cardsPack_id })
    modal.hide()
    setValue('')
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
        <h3>Edit pack</h3>
        <hr />
        <div>Name pack</div>
        <Input
          value={value}
          onChange={e => setValue(e.currentTarget.value)}
          placeholder="Enter name"
          bordered={false}
          autoFocus={true}
          ref={inputTagRef}
        />
      </div>
    </ModalFC>
  )
})
