import React from 'react'

import { show } from '@ebay/nice-modal-react'

import { AddNewPackModal } from '../../../common/components/modal/AddNewPackModal'
import { AddNewItemButton, FormTitle, TopSection } from '../../../common/style'

type PackListTopSectionPropsType = {
  formTitle: string
}

export const PackListTopSection = ({ formTitle }: PackListTopSectionPropsType) => {
  return (
    <TopSection>
      <FormTitle>{formTitle}</FormTitle>
      <AddNewItemButton type="primary" onClick={() => show(AddNewPackModal)}>
        Add new pack
      </AddNewItemButton>
    </TopSection>
  )
}
