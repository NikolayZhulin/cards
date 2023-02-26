import React, { ReactElement } from 'react'

import { ColumnsType } from 'antd/es/table'

export type PackListDataType = {
  key: React.Key
  name: string
  cards: number
  updated: string
  created: string
  author: string
  actions?: ReactElement
}

export type CardDataType = {
  key: React.Key
  question: string
  answer: string
  updated: string
  grade: number
  actions?: ReactElement
  render?: () => ReactElement
}

export const columnsForPacks: ColumnsType<PackListDataType | CardDataType> = [
  {
    title: 'Name',
    width: 200,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    ellipsis: true,
    sorter: true,
  },
  {
    title: 'Author',
    width: 150,
    dataIndex: 'author',
    key: 'user_name',
    fixed: 'left',
    ellipsis: true,
    sorter: true,
  },
  {
    title: 'Cards',
    width: 140,
    dataIndex: 'cards',
    key: 'cardsCount',
    fixed: 'left',
    sorter: true,
  },
  {
    title: 'Last Updated',
    dataIndex: 'updated',
    key: 'updated',
    width: 150,
    sorter: true,
  },
  {
    title: 'Created by',
    dataIndex: 'created',
    key: 'created',
    width: 200,
    sorter: true,
  },
  {
    title: 'Action',
    dataIndex: 'actions',
    key: 'actions',
    fixed: 'right',
    width: 150,
  },
]
