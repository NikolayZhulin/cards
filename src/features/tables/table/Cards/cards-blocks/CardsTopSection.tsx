import React from 'react'

import { useAppDispatch } from '../../../../../common/hooks/reduxHooks'
import { FormTitle } from '../../../../../common/style'
import { savePackIdForNewCard, toggleAddNewCardModal } from '../../../cards-reducer'
import { DropDown } from '../../../components/DropDown'
import { AddNewItemButton, TopSection } from '../../../styles'

type CardsTopSectionType = {
  packName?: string
  cardsPackId?: string
  userId?: string
}

export const CardsTopSection = ({ packName, cardsPackId, userId }: CardsTopSectionType) => {
  const dispatch = useAppDispatch()
  const addCard = () => {
    dispatch(toggleAddNewCardModal({ showModal: true }))
    dispatch(savePackIdForNewCard({ packId: cardsPackId }))
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
