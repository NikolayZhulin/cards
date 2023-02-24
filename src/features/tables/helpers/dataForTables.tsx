import React, { ReactElement } from 'react'

import { Rate } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { SortOrder } from 'antd/es/table/interface'

import emptyStar from '../../../assets/pictures/emptyStar.png'
import fullStar from '../../../assets/pictures/fullStar.png'
import halfStar from '../../../assets/pictures/halfStar.png'
import { StyledIcon } from '../styles/style'

export type PackListDataType = {
  key: React.Key
  name: ReactElement
  cards: number
  updated: string
  created: string
  author: string
  actions?: ReactElement
}

export type PackDataType = {
  key: React.Key
  question: string
  answer: string
  updated: string
  grade: number
  actions?: ReactElement
  render?: () => ReactElement
}

export const columnsForPacks: ColumnsType<PackDataType | PackListDataType> = [
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

export const columnsForCards: ColumnsType<PackDataType | PackListDataType> = [
  {
    title: 'Question',
    width: 318,
    dataIndex: 'question',
    key: 'question',
    fixed: 'left',
    sorter: true,
  },
  {
    title: 'Answer',
    width: 140,
    dataIndex: 'answer',
    key: 'answer',
    fixed: 'left',
    sorter: true,
  },
  {
    title: 'Last Updated',
    dataIndex: 'updated',
    key: 'updated',
    width: 200,
    sorter: true,
  },
  {
    title: 'Created by',
    dataIndex: 'updated',
    key: 'updated',
    width: 200,
    sorter: true,
  },
  {
    title: 'Grade',
    dataIndex: 'grade',
    key: 'grade',
    fixed: 'right',
    width: 150,
    render: () => <Rate />,
  },
  {
    title: '',
    dataIndex: 'actions',
    key: 'actions',
    fixed: 'right',
    width: 150,
  },
]
