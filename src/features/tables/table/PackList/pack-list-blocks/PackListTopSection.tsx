import React from 'react'

import NiceModal from '@ebay/nice-modal-react'

import { FormTitle } from '../../../../../common/style'
import { AddNewPackModal } from '../../../components/AddNewPackModal'
import { AddNewItemButton, TopSection } from '../../../styles'

type PackListTopSectionPropsType = {
  formTitle: string
}

export const PackListTopSection = ({ formTitle }: PackListTopSectionPropsType) => {
  return (
    <TopSection>
      <FormTitle>{formTitle}</FormTitle>
      <AddNewItemButton type="primary" onClick={() => NiceModal.show(AddNewPackModal)}>
        Add new pack
      </AddNewItemButton>
    </TopSection>
  )
}
