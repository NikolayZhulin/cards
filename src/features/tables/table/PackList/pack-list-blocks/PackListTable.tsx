import React from 'react'

import { Table } from 'antd'

import { PackDataType, PackListDataType } from '../../../helpers/dataForTables'
import { Title } from '../../../styles/style'
import { UseTableSort } from '../hooks/use-table-sort'

type PackListTablePropsType = {
  rows: any
  type: 'cards' | 'packs'
}

export const ListTable = ({ rows, type }: PackListTablePropsType) => {
  const { titleForEmptyTable, columnsForTable, onChangeTableHandler } = UseTableSort(type)

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
