import React, { useState } from 'react'

import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { Checkbox, Input } from 'antd'

import { useAddPackMutation } from '../../../features/packs'

import { ModalFC } from './ModalFC'

export const AddNewPackModal = NiceModal.create(() => {
  const modal = useModal()
  const [name, setName] = useState<string>('')
  const [isPrivate, setIsPrivate] = useState<boolean>(false)
  const [addPack, { isLoading: packIsAdding }] = useAddPackMutation()

  const addNewPackHandler = async () => {
    try {
      await addPack({ cardsPack: { name, private: isPrivate } }).unwrap()
      setName('')
      setIsPrivate(false)
      modal.hide()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <ModalFC
      okText={'Save'}
      danger={false}
      isOpen={modal.visible}
      isLoading={packIsAdding}
      handleOk={addNewPackHandler}
      handleCancel={() => modal.hide()}
      afterClose={() => modal.remove()}
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
})
