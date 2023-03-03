import React from 'react'

import { Skeleton, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { CardDataType, PackListDataType } from '../../../features/cards/helpers'
import { UseTableSort } from '../../hooks/use-table-sort'
import { Title } from '../../style'

type PackListTablePropsType = {
  name: string
  columns: ColumnsType<any>
  sortType: string
  rows: any
  isLoading: boolean
}

export const CustomTable = ({
  name,
  columns,
  sortType,
  rows,
  isLoading,
}: PackListTablePropsType) => {
  const { titleForEmptyTable, onChangeTableHandler } = UseTableSort(sortType, name)

  if (!rows?.length && !isLoading) {
    return <Title style={{ margin: '30px 0', minHeight: '210px' }}>{titleForEmptyTable}</Title>
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {isLoading && (
        <Skeleton
          active
          paragraph={{ rows: 9 }}
          title={false}
          style={{ position: 'absolute', zIndex: '5', width: '100%' }}
        />
      )}
      <Table<CardDataType | PackListDataType>
        columns={columns}
        dataSource={rows}
        pagination={false}
        onChange={onChangeTableHandler}
        style={{ minHeight: '300px', opacity: `${isLoading ? '0' : '1'}` }}
      />
    </div>
  )
}
