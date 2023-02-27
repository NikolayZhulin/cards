import React, { useState } from 'react'

import { create, useModal } from '@ebay/nice-modal-react'

import { useAddPackMutation } from '../../../features/packs'
import { useAutoFocus } from '../../hooks/useAutoFocus'
import { StyledCheckbox, StyledDiv, StyledInput, StyledTitle } from '../../style/modal-styles'

import { ModalFC } from './ModalFC'

export const AddNewPackModal = create(() => {
  const modal = useModal()
  const inputTagRef = useAutoFocus()
  const [name, setName] = useState<string>('')
  const [isPrivate, setIsPrivate] = useState<boolean>(false)
  const [addPack, { isLoading: packIsAdding }] = useAddPackMutation()

  const addNewPackHandler = async () => {
    try {
      await addPack({ cardsPack: { name, private: isPrivate } })
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
          ref={inputTagRef}
        />
        <hr />
        <StyledCheckbox checked={isPrivate} onChange={e => setIsPrivate(e.target.checked)}>
          Private pack
        </StyledCheckbox>
      </div>
    </ModalFC>
  )
})
