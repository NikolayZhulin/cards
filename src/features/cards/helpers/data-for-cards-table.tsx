import React, { ReactElement } from 'react'

import { ColumnsType } from 'antd/es/table'

export type PackListDataType = {
  key: React.Key
  name: ReactElement
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

export const columnsForCards: ColumnsType<CardDataType | PackListDataType> = [
  {
    title: 'Question',
    width: '20%',
    dataIndex: 'question',
    key: 'question',
    fixed: 'left',
    sorter: true,
  },
  {
    title: 'Answer',
    width: '20%',
    dataIndex: 'answer',
    key: 'answer',
    sorter: true,
  },
  {
    title: 'Last Updated',
    dataIndex: 'updated',
    key: 'updated',
    width: '20%',
    sorter: true,
  },
  {
    title: 'Created by',
    dataIndex: 'created',
    key: 'created',
    width: '20%',
    sorter: true,
  },
  {
    title: 'Grade',
    dataIndex: 'grade',
    key: 'grade',
    width: '13%',
  },
  {
    title: '',
    dataIndex: 'actions',
    key: 'actions',
    width: '7%',
  },
]
