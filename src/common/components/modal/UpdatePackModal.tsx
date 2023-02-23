import React, { useEffect, useState } from 'react'

import { Input } from 'antd'

import { toggleUpdatePackModal } from '../../../features/packs/packs-reducer'
import { useUpdatePackMutation } from '../../../features/tables'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'

import { ModalFC } from './ModalFC'

export const UpdatePackModal = () => {
  const showModal = useAppSelector(state => state.packs.isUpdatePackModalOpen)
  const packId = useAppSelector(state => state.packs.packForUpdate.id)
  const prevName = useAppSelector(state => state.packs.packForUpdate.name)
  const dispatch = useAppDispatch()
  const [updatePack, { isLoading: packIsUpdating }] = useUpdatePackMutation()
  const [value, setValue] = useState<string>(prevName)

  const closeModal = () => dispatch(toggleUpdatePackModal({ showModal: false }))

  const updatePackHandler = async () => {
    try {
      await updatePack({ cardsPack: { _id: packId, name: value } }).unwrap()
      closeModal()
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => setValue(prevName), [prevName])

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
