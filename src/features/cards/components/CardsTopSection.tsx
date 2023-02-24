import React from 'react'

import NiceModal, { show, useModal } from '@ebay/nice-modal-react'

import { AddNewCardModal } from '../../../common/components/modal/AddNewCardModal'
import { useAppDispatch } from '../../../common/hooks/reduxHooks'
import { FormTitle, AddNewItemButton, TopSection } from '../../../common/style'
import { savePackIdForNewCard, toggleAddNewCardModal } from '../cards-reducer'

import { DropDown } from './DropDown'

type CardsTopSectionType = {
  packName?: string
  cardsPackId?: string
  userId?: string
}

export const CardsTopSection = ({ packName, cardsPackId, userId }: CardsTopSectionType) => {
  // const dispatch = useAppDispatch()
  // const modal = useModal('add-card-modal')
  const modal = useModal(AddNewCardModal)
  const addCard = async () => {
    // dispatch(toggleAddNewCardModal({ showModal: true }))
    // dispatch(savePackIdForNewCard({ packId: cardsPackId }))
    // await show('add-card-modal', { cardsPack_id: cardsPackId })
    // cardsPackId && modal.show()
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
      {/*<AddNewCardModal cardsPack_id={cardsPackId} />*/}
    </TopSection>
  )
}
