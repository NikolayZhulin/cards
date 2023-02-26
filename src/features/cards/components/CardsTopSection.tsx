import React from 'react'

import { show } from '@ebay/nice-modal-react'

import { AddNewItemButton, FormTitle, TopSection } from '../../../common/style'

import { DropDown } from './DropDown'

type CardsTopSectionType = {
  packName?: string
  cardsPackId?: string
  userId?: string
  isMyPack?: boolean
  packId?: string
}

export const CardsTopSection = ({
  packName,
  cardsPackId,
  userId,
  isMyPack,
  packId,
}: CardsTopSectionType) => {
  const addCard = () => {
    show('add-card-modal', { cardsPack_id: cardsPackId })
  }

  return (
    <TopSection>
      <FormTitle>
        {packName}
        <DropDown
          packId={packId}
          packName={packName}
          packUserId={userId}
          cardsPackId={cardsPackId}
        />
      </FormTitle>
      {isMyPack && (
        <AddNewItemButton type="primary" onClick={addCard}>
          Add new card
        </AddNewItemButton>
      )}
    </TopSection>
  )
}
