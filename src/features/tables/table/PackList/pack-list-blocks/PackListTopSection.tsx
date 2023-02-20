import React from 'react'

import { useAppDispatch } from '../../../../../common/hooks/reduxHooks'
import { FormTitle } from '../../../../../common/style'
import { toggleAddNewPackModal } from '../../../packs-reducer'
import { AddNewItemButton, TopSection } from '../../../styles'

type PackListTopSectionPropsType = {
  formTitle: string
}

export const PackListTopSection = ({ formTitle }: PackListTopSectionPropsType) => {
  const dispatch = useAppDispatch()
  const addNewItemHandler = () => {
    dispatch(toggleAddNewPackModal({ showModal: true }))
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
