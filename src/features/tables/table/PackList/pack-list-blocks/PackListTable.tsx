import React from 'react'

import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { PackDataType, PackListDataType } from '../../../helpers'
import { UseTableSort } from '../../../hooks'
import { Title } from '../../../styles'

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
