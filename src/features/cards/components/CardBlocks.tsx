import React from 'react'

import { useModal } from '@ebay/nice-modal-react'

import { AddNewCardModal } from '../../../common/components/modal/AddNewCardModal'
import { PaginationFC } from '../../../common/components/pagination/PaginationFC'
import { PackListTable } from '../../packs/components/PackListTable'
import { columnsForCards } from '../helpers'
import { UseCards } from '../hooks'

import { BackToPacksButton } from './BackToPacksButton'
import CardMiddleSection from './CardMiddleSection'
import { CardsTopSection } from './CardsTopSection'

export const CardsBlocks = () => {
  const { onChangePaginationHandler, rows, response, isLoading } = UseCards()

  return (
    <>
      <BackToPacksButton />
      <CardsTopSection
        packName={response?.data?.packName}
        cardsPackId={response?.originalArgs?.cardsPack_id}
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
