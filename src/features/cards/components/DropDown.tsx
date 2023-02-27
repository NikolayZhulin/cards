import React from 'react'

import { DeleteOutlined, DownCircleOutlined, EditOutlined, ReadOutlined } from '@ant-design/icons'
import { show } from '@ebay/nice-modal-react'
import type { MenuProps } from 'antd'
import { Dropdown, Space } from 'antd'
import { NavLink, useNavigate } from 'react-router-dom'
import { bool } from 'yup'

import { useAppSelector } from '../../../common/hooks/reduxHooks'
import { PATH } from '../../../common/utils'

type PropsType = {
  cardsPackId?: string
  packUserId: string | undefined
  packName: string | undefined
  isEmptyPack: boolean
}
export const DropDown = ({ cardsPackId, packUserId, packName, isEmptyPack }: PropsType) => {
  const myID = useAppSelector(state => state.auth.userId)
  const navigate = useNavigate()

  const items: MenuProps['items'] = [
    {
      label: 'Edit',
      key: '0',
      disabled: packUserId !== myID,
      onClick: () => {
        show('update-pack-modal', {
          cardsPack_id: cardsPackId,
          prevName: packName,
          insidePack: true,
        })
      },
      icon: <EditOutlined />,
    },
    {
      label: 'Delete',
      key: '1',
      disabled: packUserId !== myID,
      onClick: () => {
        show('delete-pack-modal', {
          cardsPack_id: cardsPackId,
          packName: packName,
          insidePack: true,
        })
      },
      icon: <DeleteOutlined />,
    },
    {
      label: 'Learn',
      key: '2',
      disabled: isEmptyPack,
      icon: <ReadOutlined />,
      onClick: () => {
        navigate(PATH.LEARN + '?cardsPack_id=' + cardsPackId)
      },
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
