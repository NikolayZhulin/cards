import React from 'react'

import { CustomTable } from '../../../common/components/table/CustomTable'
import { usePackList } from '../../cards/hooks'
import { columnsForPacks } from '../helpers/data-for-packs-list'

import { PackListMiddleSection } from './PackListMiddleSection'
import { PackListTopSection } from './PackListTopSection'

import { PaginationFC } from 'common/components/pagination/PaginationFC'

export const PacksListBlocks = () => {
  const {
    getAllPacks,
    getMyPacks,
    maxCardsCount,
    minCardsCount,
    onChangePaginationHandler,
    response,
    search,
    rows,
    isLoading,
  } = usePackList()

  return (
    <>
      <PackListTopSection formTitle={'Pack list'} />
      <PackListMiddleSection
        getMyPacks={getMyPacks}
        getAllPacks={getAllPacks}
        maxCardsCount={maxCardsCount}
        minCardsCount={minCardsCount}
        min={+search.min}
        max={+search.max}
      />
      <CustomTable
        {...{ name: 'Packs', columns: columnsForPacks, sortType: 'sortPacks', rows }}
        isLoading={isLoading}
      />
      <PaginationFC
        current={response.data?.page}
        pageSize={response.data?.pageCount}
        total={response.data?.cardPacksTotalCount}
        onChange={onChangePaginationHandler}
      />
    </>
  )
}
