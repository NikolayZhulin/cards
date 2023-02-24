import React from 'react'

import NiceModal, { useModal } from '@ebay/nice-modal-react'

import { AddNewPackModal } from '../../../common/components/modal/AddNewPackModal'
import { AddNewItemButton, FormTitle, TopSection } from '../../../common/style'

type PackListTopSectionPropsType = {
  formTitle: string
}

export const PackListTopSection = ({ formTitle }: PackListTopSectionPropsType) => {
  const onClickHandler = () => NiceModal.show(AddNewPackModal, {})

  return (
    <TopSection>
      <FormTitle>{formTitle}</FormTitle>
      <AddNewItemButton type="primary" onClick={onClickHandler}>
        Add new pack
      </AddNewItemButton>
    </TopSection>
  )
}
