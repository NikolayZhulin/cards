import React, { useState } from 'react'

import { Input } from 'antd'

import { ModalFC } from '../../../common/components/modal/ModalFC'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/reduxHooks'
import { savePackForUpdate, toggleUpdatePackModal } from '../packs-reducer'
import { useUpdatePackMutation } from '../tablesApi'

export const UpdatePackModal = () => {
  const showModal = useAppSelector(state => state.packs.isUpdatePackModalOpen)
  const packId = useAppSelector(state => state.packs.packForUpdate.id)
  const oldName = useAppSelector(state => state.packs.packForUpdate.name)
  const dispatch = useAppDispatch()
  const [updatePack, { isLoading: packIsUpdating }] = useUpdatePackMutation()
  const [value, setValue] = useState<string>(oldName)

  const closeModal = () => dispatch(toggleUpdatePackModal({ showModal: false }))

  const updatePackHandler = async () => {
    try {
      await updatePack({ cardsPack: { _id: packId, name: value } }).unwrap()
      closeModal()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <ModalFC
      okText={'Save'}
      danger={false}
      isOpen={showModal}
      isLoading={packIsUpdating}
      handleOk={updatePackHandler}
      handleCancel={closeModal}
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
        />
      </div>
    </ModalFC>
  )
}
