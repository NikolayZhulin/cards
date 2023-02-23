import React from 'react'

import { DeleteOutlined, DownCircleOutlined, EditOutlined, ReadOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Dropdown, Space } from 'antd'

import { useAppDispatch, useAppSelector } from '../../../common/hooks/reduxHooks'
import {
  savePackForDelete,
  savePackForUpdate,
  toggleDeletePackModal,
  toggleUpdatePackModal,
} from '../../packs/packs-reducer'

type PropsType = {
  cardsPackId?: string
  packUserId: string | undefined
  packName: string | undefined
}
export const DropDown = ({ cardsPackId, packUserId, packName }: PropsType) => {
  const myID = useAppSelector(state => state.auth.userId)
  const dispatch = useAppDispatch()

  const items: MenuProps['items'] = [
    {
      label: 'Edit',
      key: '0',
      disabled: packUserId !== myID,
      onClick: () => {
        dispatch(toggleUpdatePackModal({ showModal: true }))
        dispatch(savePackForUpdate({ packId: cardsPackId, name: packName }))
      },
      icon: <EditOutlined />,
    },
    {
      label: 'Delete',
      key: '1',
      disabled: packUserId !== myID,
      onClick: async () => {
        if (cardsPackId) {
          await dispatch(toggleDeletePackModal({ showModal: true }))
          await dispatch(
            savePackForDelete({ packId: cardsPackId, name: packName, insidePack: true })
          )
        }
      },
      icon: <DeleteOutlined />,
    },
    {
      label: 'Learn',
      key: '2',
      onClick: () => {
        alert('Learn')
      },
      icon: <ReadOutlined />,
    },
  ]

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <a onClick={e => e.preventDefault()}>
        <Space>
          <DownCircleOutlined style={{ marginLeft: '10px' }} />
        </Space>
      </a>
    </Dropdown>
  )
}
