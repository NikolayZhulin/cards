import React from 'react'

import { FormTitle } from '../../../../../common/style'
import { AddNewItemButton, TopSection } from '../../../styles'

type PackListTopSectionPropsType = {
  formTitle: string
  addNewItem: () => void
}

export const PackListTopSection = ({ addNewItem, formTitle }: PackListTopSectionPropsType) => {
  return (
    <TopSection>
      <FormTitle>{formTitle}</FormTitle>
      <AddNewItemButton type="primary" onClick={addNewItem}>
        Add new pack
      </AddNewItemButton>
    </TopSection>
  )
}
