import React from 'react'

import { DownCircleOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Dropdown, Space } from 'antd'

import { useDeletePackMutation, useUpdatePackMutation } from '../../../features/tables/tablesApi'

type PropsType = {
  id: string | undefined
}
export const DropDown = ({ id }: PropsType) => {
  const [updatePack, {}] = useUpdatePackMutation()
  const [deletePack, {}] = useDeletePackMutation()
  const items: MenuProps['items'] = [
    {
      label: 'Edit',
      key: '0',
      disabled: false,
      onClick: () => updatePack(id),
      // icon: editIcon,
    },
    {
      label: 'Delete',
      key: '1',
      disabled: false,
      onClick: () => deletePack(id),
      // icon: deleteIcon,
    },
    {
      label: 'Learn',
      key: '2',
      disabled: true,
      onClick: () => {},
      // icon: learnIcon,
    },
  ]

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <a onClick={e => e.preventDefault()}>
        <Space>
          <DownCircleOutlined />
        </Space>
      </a>
    </Dropdown>
  )
}
