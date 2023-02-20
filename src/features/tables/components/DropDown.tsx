import React from 'react'

import { DeleteOutlined, DownCircleOutlined, EditOutlined, ReadOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Dropdown, Space } from 'antd'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../common/hooks/reduxHooks'
import { PATH } from '../../../common/utils'
import { useDeletePackMutation } from '../index'
import { savePackIdForUpdate, savePackNameForUpdate, toggleUpdatePackModal } from '../packs-reducer'

type PropsType = {
  cardsPackId?: string
  packUserId: string | undefined
  packName: string | undefined
}
export const DropDown = ({ cardsPackId, packUserId, packName }: PropsType) => {
  const [deletePack, {}] = useDeletePackMutation()
  const myID = useAppSelector(state => state.auth.userId)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const items: MenuProps['items'] = [
    {
      label: 'Edit',
      key: '0',
      disabled: packUserId !== myID,
      onClick: () => {
        dispatch(toggleUpdatePackModal({ showModal: true }))
        dispatch(savePackIdForUpdate({ packId: cardsPackId }))
        dispatch(savePackNameForUpdate({ name: packName }))
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
