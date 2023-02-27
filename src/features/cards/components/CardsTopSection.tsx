import React, { useEffect } from 'react'

import { show } from '@ebay/nice-modal-react'

import { AddNewItemButton, FormTitle, TopSection } from '../../../common/style'

import { DropDown } from './DropDown'

type CardsTopSectionType = {
  packName?: string
  cardsPackId?: string
  userId?: string
  isMyPack?: boolean
}

export const CardsTopSection = ({
  packName,
  cardsPackId,
  userId,
  isMyPack,
}: CardsTopSectionType) => {
  useEffect(() => {}, [isMyPack])

  return (
    <TopSection>
      <FormTitle>
        {packName}
        <DropDown packName={packName} packUserId={userId} cardsPackId={cardsPackId} />
      </FormTitle>
      {isMyPack && (
        <AddNewItemButton
          type="primary"
          onClick={() => show('add-card-modal', { cardsPack_id: cardsPackId })}
        >
          Add new card
        </AddNewItemButton>
      )}
    </TopSection>
  )
}
