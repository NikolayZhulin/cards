import React from 'react'

import { DownCircleOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Dropdown, Space } from 'antd'

import deleteIcon from '../../../assets/pictures/deleteIcon.png'
import editIcon from '../../../assets/pictures/editIcon.png'
import learnIcon from '../../../assets/pictures/learnIcon.png'
import { usePackList } from '../../../features/tables/table/PackList/hooks/use-pack-list'

export const DropDown = () => {
  const { deletePack, updatePack } = usePackList()
  const items: MenuProps['items'] = [
    {
      label: 'Edit',
      key: '0',
      disabled: false,
      onClick: () => deletePack('1'),
      icon: editIcon,
    },
    {
      label: 'Delete',
      key: '1',
      disabled: false,
      onClick: () => updatePack('2'),
      icon: deleteIcon,
    },
    {
      label: 'Learn',
      key: '2',
      disabled: true,
      onClick: () => {},
      icon: learnIcon,
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
