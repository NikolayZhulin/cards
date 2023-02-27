import React from 'react'

import { PaginationFC } from '../../../common/components/pagination/PaginationFC'
import { CustomTable } from '../../../common/components/table/CustomTable'
import { columnsForCards } from '../helpers'
import { UseCards } from '../hooks'

import { BackToPacksButton } from './BackToPacksButton'
import CardMiddleSection from './CardMiddleSection'
import { CardsTopSection } from './CardsTopSection'

export const CardsBlocks = () => {
  const { onChangePaginationHandler, rows, response, isLoading, isMyPack, isEmptyPack } = UseCards()

  return (
    <>
      <BackToPacksButton />
      <CardsTopSection
        packName={response?.data?.packName}
        cardsPackId={response?.originalArgs?.cardsPack_id}
        userId={response?.data?.packUserId}
        isMyPack={isMyPack}
        isEmptyPack={isEmptyPack}
      />
      <CardMiddleSection />
      <CustomTable
        {...{
          name: 'Cards',
          columns: columnsForCards,
          sortType: 'sortCards',
          rows,
        }}
        isLoading={isLoading}
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
