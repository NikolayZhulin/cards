import React from 'react'

import { Preloader } from '../../../../../common/components'
import { PaginationFC } from '../../../../../common/components/pagination/PaginationFC'
import { columnsForCards } from '../../../helpers'
import { UseCards } from '../../../hooks'
import { useLazyFetchCardsQuery } from '../../../tablesApi'
import { PackListTable } from '../../PackList/pack-list-blocks/PackListTable'

import { BackToPacksButton } from './BackToPacksButton'
import CardMiddleSection from './CardMiddleSection'
import { CardsTopSection } from './CardsTopSection'

export const CardsBlocks = () => {
  const { addNewCard, onChangePaginationHandler, rows, response } = UseCards()

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
      <PackListTable
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
