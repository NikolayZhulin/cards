import React from 'react'

import { Dropdown, MenuProps, Space } from 'antd'
import { useNavigate } from 'react-router-dom'

import avaIcon from '../../../assets/pictures/avatar.jpg'
import { StyledUserBlock } from '../../style/header'
import { PATH } from '../../utils'
import { useHeader } from '../app-header/hooks/useHeader'

type Props = {
  name?: string
  avatar?: string
}
export const UserBlock = ({ avatar, name }: Props) => {
  const navigate = useNavigate()
  const { isLoggedIn, logOut } = useHeader()
  const items: MenuProps['items'] = [
    {
      label: 'Profile',
      key: '0',
      onClick: () => navigate(PATH.PROFILE),
    },
    {
      label: 'Packs',
      key: '1',
      onClick: () => navigate(PATH.PACKS_LIST),
    },
    {
      label: 'Logout',
      key: '2',
      onClick: () => logOut({}),
    },
  ]

  return (
    <StyledUserBlock>
      <Dropdown menu={{ items }} trigger={['click']}>
        <a
          onClick={e => e.preventDefault()}
          style={{ borderBottom: '1px dashed', cursor: 'pointer' }}
        >
          <Space>{name || 'unknown User'}</Space>
        </a>
      </Dropdown>
      <img src={avatar || avaIcon} alt="photo" style={{ height: '50px', borderRadius: '50%' }} />
    </StyledUserBlock>
  )
}
