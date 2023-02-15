import React, { ReactElement } from 'react'

import { ColumnsType } from 'antd/es/table'

import emptyStar from '../../../assets/pictures/emptyStar.png'
import fullStar from '../../../assets/pictures/fullStar.png'
import halfStar from '../../../assets/pictures/halfStar.png'
import { StyledIcon } from '../styles/style'

export type PackListDataType = {
  key: React.Key
  name: ReactElement<any, any>
  cards: number
  updated: string
  created: string
  actions?: ReactElement<any, any>
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

export const columns: ColumnsType<PackListDataType> = [
  {
    title: 'Name',
    width: 318,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    ellipsis: true,
  },
  {
    title: 'Cards',
    width: 140,
    dataIndex: 'cards',
    key: 'cards',
    fixed: 'left',
  },
  {
    title: 'Last Updated',
    dataIndex: 'updated',
    key: 'updated',
    width: 200,
  },
  {
    title: 'Created by',
    dataIndex: 'updated',
    key: 'updated',
    width: 200,
  },
  {
    title: 'Action',
    dataIndex: 'actions',
    key: 'actions',
    fixed: 'right',
    width: 150,
  },
]

export const columnsForPack: ColumnsType<PackDataType> = [
  {
    title: 'Question',
    width: 318,
    dataIndex: 'question',
    key: 'question',
    fixed: 'left',
  },
  {
    title: 'Answer',
    width: 140,
    dataIndex: 'answer',
    key: 'answer',
    fixed: 'left',
  },
  {
    title: 'Last Updated',
    dataIndex: 'updated',
    key: 'updated',
    width: 200,
  },
  {
    title: 'Created by',
    dataIndex: 'updated',
    key: 'updated',
    width: 200,
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
