import React, { useState } from 'react'

import { Checkbox, Input } from 'antd'

import { ModalFC } from '../../../common/components/modal/ModalFC'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/reduxHooks'
import { toggleAddNewPackModal } from '../packs-reducer'
import { useAddPackMutation } from '../tablesApi'

export const AddNewPackModal = () => {
  const openModal = useAppSelector(state => state.packs.isAddNewPackModalOpen)
  const dispatch = useAppDispatch()
  const [name, setName] = useState<string>('')
  const [isPrivate, setIsPrivate] = useState<boolean>(false)
  const [addPack, { isLoading: packIsAdding }] = useAddPackMutation()

  const closeModal = () => {
    setName('')
    dispatch(toggleAddNewPackModal({ showModal: false }))
  }
  const addNewPackHandler = async () => {
    try {
      await addPack({ cardsPack: { name, private: isPrivate } }).unwrap()
      closeModal()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <ModalFC
      okText={'Save'}
      danger={false}
      isOpen={openModal}
      isLoading={packIsAdding}
      handleOk={addNewPackHandler}
      handleCancel={closeModal}
    >
      <div>
        <h3>Add new pack</h3>
        <hr />
        <div>Name pack</div>
        <Input
          value={name}
          onChange={e => setName(e.currentTarget.value)}
          placeholder="Enter name"
          bordered={false}
        />
        <Checkbox checked={isPrivate} onChange={e => setIsPrivate(e.target.checked)}>
          Private pack
        </Checkbox>
      </div>
    </ModalFC>
  )
}
