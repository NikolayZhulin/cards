import React from 'react'

import { useAppDispatch } from '../../../common/hooks/reduxHooks'
import { FormTitle, AddNewItemButton, TopSection } from '../../../common/style'
import { toggleAddNewPackModal } from '../packs-reducer'

type PackListTopSectionPropsType = {
  formTitle: string
}

export const PackListTopSection = ({ formTitle }: PackListTopSectionPropsType) => {
  const dispatch = useAppDispatch()
  // const modal = useModal(add)
  const addNewItemHandler = () => {
    dispatch(toggleAddNewPackModal({ showModal: true }))
    // modal.show({titi})
  }

  return (
    <TopSection>
      <FormTitle>{formTitle}</FormTitle>
      <AddNewItemButton type="primary" onClick={addNewItemHandler}>
        Add new pack
      </AddNewItemButton>
    </TopSection>
  )
}
