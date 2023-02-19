import React, { useState } from 'react'

import { Checkbox, Input } from 'antd'

import { ModalFC } from '../../../common/components/modal/ModalFC'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/reduxHooks'
import { toggleUpdatePackModal } from '../packs-reducer'
import { useAddPackMutation, useUpdatePackMutation } from '../tablesApi'

export const UpdatePackModal = () => {
  const showModal = useAppSelector(state => state.packs.isUpdatePackModalOpen)
  const id = useAppSelector(state => state.packs.packForUpdate)
  const dispatch = useAppDispatch()
  const [updatePack, { isLoading: packIsUpdating }] = useUpdatePackMutation()
  const [value, setValue] = useState<string>('')

  const closeModal = () => {
    setValue('')
    dispatch(toggleUpdatePackModal({ showModal: false }))
  }

  const updatePackHandler = async (_id: string) => {
    try {
      await updatePack({ cardsPack: { _id, name: value } }).unwrap()
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
      handleOk={() => updatePackHandler(id)}
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
