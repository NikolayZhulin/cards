import React from 'react'

import { FormTitle } from '../../../../../common/style'
import { DropDown } from '../../../components/DropDown'
import { AddNewItemButton, TopSection } from '../../../styles'

type CardsTopSectionType = {
  packName?: string
  cardsPackId?: string
  addCard: () => void
  userId?: string
}

export const CardsTopSection = ({
  packName,
  cardsPackId,
  addCard,
  userId,
}: CardsTopSectionType) => {
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
