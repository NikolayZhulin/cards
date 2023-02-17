import React from 'react'

import { DropDown } from '../../../../../common/components/dropdown/DropDown'
import { FormTitle } from '../../../../../common/style'
import { AddNewItemButton, TopSection } from '../../../styles'

type CardsTopSectionType = {
  packName?: string
  cardsPackId?: string
  addCard: () => void
}

export const CardsTopSection = ({ packName, cardsPackId, addCard }: CardsTopSectionType) => {
  return (
    <TopSection>
      <FormTitle>
        {packName}
        <DropDown id={cardsPackId} />
      </FormTitle>
      <AddNewItemButton type="primary" onClick={addCard}>
        Add new card
      </AddNewItemButton>
    </TopSection>
  )
}
