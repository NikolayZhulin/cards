import React from 'react'

import { Table, TableProps } from 'antd'
import { ColumnType } from 'antd/es/table'
import { SorterResult } from 'antd/es/table/interface'

import { useSearch } from '../../../../../common/hooks/useSearch'
import { Title } from '../../../styles/style'
import {
  columns,
  columnsForPack,
  PackDataType,
  PackListDataType,
} from '../../../utils/dataForTables'

type PackListTablePropsType = {
  rows: any
  type: 'cards' | 'packs'
}

export const ListTable = ({ rows, type }: PackListTablePropsType) => {
  const titleForEmptyTable = `${type === 'cards' ? 'Cards' : 'Packs'} with that name does not exist`
  const columnsForTable = type === 'cards' ? columnsForPack : columns
  const { setSearchParams, search } = useSearch()

  const onChangeTableHandler: TableProps<PackDataType | PackListDataType>['onChange'] = (
    pagination,
    filters,
    sorter
  ) => {
    const srt = sorter as SorterResult<PackDataType | PackListDataType>
    const order = srt.order
    const field = srt.columnKey

    switch (order) {
      case 'ascend':
        setSearchParams({ ...search, sortCards: `1${field}` })
        break
      case 'descend':
        setSearchParams({ ...search, sortCards: `0${field}` })
        break
      default: {
        const searchCopy = { ...search }

        delete searchCopy.sortCards
        setSearchParams({ ...searchCopy })
      }
    }
    // setSearchParams({
    //   ...search,
    //   sortPacks: search.sortPacks === `0${field}` ? `1${field}` : `0${field}`,
    // })
  }

  if (!rows?.length) {
    return <Title style={{ margin: '30px 0' }}>{titleForEmptyTable}</Title>
  }

  return (
    <Table<PackDataType | PackListDataType>
      columns={columnsForTable}
      dataSource={rows}
      pagination={false}
      onChange={onChangeTableHandler}
    />
  )
}
