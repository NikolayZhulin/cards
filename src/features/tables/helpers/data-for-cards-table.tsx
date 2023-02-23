import React, { ReactElement } from 'react'

import { ColumnsType } from 'antd/es/table'
import { SortOrder } from 'antd/es/table/interface'

import emptyStar from '../../../assets/pictures/emptyStar.png'
import fullStar from '../../../assets/pictures/fullStar.png'
import halfStar from '../../../assets/pictures/halfStar.png'
import { StyledIcon } from '../styles'

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
    render: () => (
      <div>
        <StyledIcon src={fullStar} alt={'full star'} />
        <StyledIcon src={fullStar} alt={'full star'} />
        <StyledIcon src={fullStar} alt={'full star'} />
        <StyledIcon src={halfStar} alt={'half star'} />
        <StyledIcon src={emptyStar} alt={'empty star'} />
      </div>
    ),
  },
  {
    title: '',
    dataIndex: 'actions',
    key: 'actions',
    fixed: 'right',
    width: 150,
  },
]
