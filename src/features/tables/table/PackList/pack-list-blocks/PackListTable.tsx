import React from 'react'

import { Table } from 'antd'

import { columnsForCards, columnsForPacks, PackDataType, PackListDataType } from '../../../helpers'
import { UseTableSort } from '../../../hooks'
import { Title } from '../../../styles'
import { ColumnsType } from 'antd/es/table'

type PackListTablePropsType = {
  rows: any
  name: string
  columns: ColumnsType<any>
  sortType: string
}

export const ListTable = ({ rows, name, columns, sortType }: PackListTablePropsType) => {
  const { titleForEmptyTable, onChangeTableHandler } = UseTableSort(sortType, name)

  if (!rows?.length) {
    return <Title style={{ margin: '30px 0' }}>{titleForEmptyTable}</Title>
  }

  return (
    <Table<PackDataType | PackListDataType>
      columns={columns}
      dataSource={rows}
      pagination={false}
      onChange={onChangeTableHandler}
    />
  )
}
