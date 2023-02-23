import React from 'react'

import { Skeleton, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { bool } from 'yup'

import { CardDataType, PackListDataType } from '../../tables/helpers'
import { UseTableSort } from '../../tables/hooks'
import { Title } from '../../tables/styles'

type PackListTablePropsType = {
  name: string
  columns: ColumnsType<any>
  sortType: string
  rows: any
  isLoading: boolean
}

export const PackListTable = ({
  name,
  columns,
  sortType,
  rows,
  isLoading,
}: PackListTablePropsType) => {
  const { titleForEmptyTable, onChangeTableHandler } = UseTableSort(sortType, name)

  if (isLoading) return <Skeleton active paragraph={{ rows: 8 }} />

  if (!rows?.length) {
    return <Title style={{ margin: '30px 0', minHeight: '210px' }}>{titleForEmptyTable}</Title>
  }

  return (
    <Table<CardDataType | PackListDataType>
      columns={columns}
      dataSource={rows}
      pagination={false}
      onChange={onChangeTableHandler}
      style={{ minHeight: '300px' }}
    />
  )
}
