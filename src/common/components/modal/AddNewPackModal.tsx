import React, { useState } from 'react'

import NiceModal, { useModal } from '@ebay/nice-modal-react'

import { useAddPackMutation } from '../../../features/packs'
import { StyledCheckbox, StyledDiv, StyledInput, StyledTitle } from '../../style/modal-styles'

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
        <StyledTitle>Add new pack</StyledTitle>
        <hr />
        <StyledDiv>Name pack</StyledDiv>
        <StyledInput
          value={name}
          onChange={e => setName(e.currentTarget.value)}
          placeholder="Enter name"
          bordered={false}
        />
        <hr />
        <StyledCheckbox checked={isPrivate} onChange={e => setIsPrivate(e.target.checked)}>
          Private pack
        </StyledCheckbox>
      </div>
    </ModalFC>
  )
})
