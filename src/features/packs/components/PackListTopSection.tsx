import React from 'react'

import { show } from '@ebay/nice-modal-react'

import { AddNewItemButton, FormTitle, TopSection } from '../../../common/style'

type PackListTopSectionPropsType = {
  formTitle: string
}

export const PackListTopSection = ({ formTitle }: PackListTopSectionPropsType) => {
  const addNewItemHandler = () => {
    show('add-pack-modal')
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
