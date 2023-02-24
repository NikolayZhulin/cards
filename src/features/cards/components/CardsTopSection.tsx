import React from 'react'

import NiceModal, { show } from '@ebay/nice-modal-react'

import { AddNewCardModal } from '../../../common/components/modal/AddNewCardModal'
import { AddNewPackModal } from '../../../common/components/modal/AddNewPackModal'
import { AddNewItemButton, FormTitle, TopSection } from '../../../common/style'

import { DropDown } from './DropDown'

type CardsTopSectionType = {
  packName?: string
  cardsPackId?: string
  userId?: string
}

export const CardsTopSection = ({ packName, cardsPackId, userId }: CardsTopSectionType) => {
  const addCard = () => {
    show('add-card-modal', { cardsPack_id: cardsPackId })
  }

  return (
    <TopSection>
      <FormTitle>
        {packName}
        <DropDown packName={packName} packUserId={userId} cardsPackId={cardsPackId} />
      </FormTitle>
      <AddNewItemButton type="primary" onClick={addCard}>
        Add new card
      </AddNewItemButton>
    </TopSection>
  )
}
