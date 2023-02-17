import React from 'react'

import { DeleteOutlined, DownCircleOutlined, EditOutlined, ReadOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Dropdown, Space } from 'antd'
import { useNavigate } from 'react-router-dom'

import {
  useDeletePackMutation,
  useLazyFetchCardsQuery,
  useUpdatePackMutation,
} from '../../../features/tables'
import { useAppSelector } from '../../hooks/reduxHooks'
import { PATH } from '../../utils'

type PropsType = {
  cardsPackId: string | undefined
  packUserId: string | undefined
}
export const DropDown = ({ cardsPackId, packUserId }: PropsType) => {
  const [updatePack, {}] = useUpdatePackMutation()
  const [deletePack, {}] = useDeletePackMutation()
  const [trigger, response] = useLazyFetchCardsQuery()
  const myID = useAppSelector(state => state.auth.userId)
  const navigate = useNavigate()

  const items: MenuProps['items'] = [
    {
      label: 'Edit',
      key: '0',
      disabled: packUserId !== myID,
      onClick: async () => {
        await updatePack(cardsPackId)
        trigger({ cardsPack_id: cardsPackId })
      },
      icon: <EditOutlined />,
    },
    {
      label: 'Delete',
      key: '1',
      disabled: packUserId !== myID,
      onClick: async () => {
        await deletePack(cardsPackId)
        navigate(PATH.PACKS_LIST)
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
