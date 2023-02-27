import React, { useEffect } from 'react'

import { show } from '@ebay/nice-modal-react'

import { AddNewCardModal } from '../../../common/components/modal/AddNewCardModal'
import { AddNewItemButton, FormTitle, TopSection } from '../../../common/style'

import { DropDown } from './DropDown'

type CardsTopSectionType = {
  packName?: string
  cardsPackId?: string
  userId?: string
  isMyPack?: boolean
  isEmptyPack: boolean
}

export const CardsTopSection = ({
  packName,
  cardsPackId,
  userId,
  isMyPack,
  isEmptyPack,
}: CardsTopSectionType) => {
  return (
    <TopSection>
      <FormTitle>
        {packName}
        <DropDown
          packName={packName}
          packUserId={userId}
          cardsPackId={cardsPackId}
          isEmptyPack={isEmptyPack}
        />
      </FormTitle>
      {isMyPack && (
        <AddNewItemButton
          type="primary"
          onClick={() => show(AddNewCardModal, { cardsPack_id: cardsPackId })}
        >
          Add new card
        </AddNewItemButton>
      )}
    </TopSection>
  )
}
