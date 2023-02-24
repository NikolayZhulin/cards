import React from 'react'

import NiceModal, { show } from '@ebay/nice-modal-react'
import { bool } from 'yup'

import { AddNewCardModal } from '../../../common/components/modal/AddNewCardModal'
import { AddNewPackModal } from '../../../common/components/modal/AddNewPackModal'
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
  const addCard = () => {
    show('add-card-modal', { cardsPack_id: cardsPackId })
  }

  return (
    <TopSection>
      <FormTitle>
        {packName}
        <DropDown packName={packName} packUserId={userId} cardsPackId={cardsPackId} />
      </FormTitle>
      {isMyPack ? (
        <AddNewItemButton type="primary" onClick={addCard}>
          Add new card
        </AddNewItemButton>
      ) : (
        ''
      )}
    </TopSection>
  )
}
