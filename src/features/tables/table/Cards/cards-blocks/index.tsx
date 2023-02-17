import React from 'react'

import { Preloader } from '../../../../../common/components'
import { PaginationFC } from '../../../../../common/components/pagination/PaginationFC'
import { columnsForCards } from '../../../helpers'
import { UseCards } from '../../../hooks'
import { ListTable } from '../../PackList/pack-list-blocks/PackListTable'

import { BackToPacksButton } from './BackToPacksButton'
import CardMiddleSection from './CardMiddleSection'
import { CardsTopSection } from './CardsTopSection'

export const CardsBlocks = () => {
  const { addNewCard, response, onChangePaginationHandler, rows } = UseCards()

  if (response.isLoading) return <Preloader />

  return (
    <>
      <BackToPacksButton />
      <CardsTopSection
        packName={response?.data?.packName}
        cardsPackId={response?.originalArgs?.cardsPack_id}
        addCard={addNewCard}
        userId={response?.data?.packUserId}
      />
      <CardMiddleSection />
      <ListTable
        {...{
          name: 'Cards',
          columns: columnsForCards,
          sortType: 'sortCards',
          rows,
        }}
      />
      <PaginationFC
        current={response.data?.page}
        pageSize={response.data?.pageCount}
        total={response.data?.cardsTotalCount}
        onChange={onChangePaginationHandler}
      />
    </>
  )
}
