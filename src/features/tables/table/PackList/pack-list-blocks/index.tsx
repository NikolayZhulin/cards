import React from 'react'

import { Preloader } from '../../../../../common/components'
import { PaginationFC } from '../../../../../common/components/pagination/PaginationFC'
import { columnsForPacks } from '../../../helpers'
import { usePackList } from '../../../hooks'

import { PackListMiddleSection } from './PackListMiddleSection'
import { PackListTable } from './PackListTable'
import { PackListTopSection } from './PackListTopSection'

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
  } = usePackList()

  if (response.isLoading) return <Preloader />

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
      <PackListTable
        {...{ name: 'Packs', columns: columnsForPacks, sortType: 'sortPacks', rows }}
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
