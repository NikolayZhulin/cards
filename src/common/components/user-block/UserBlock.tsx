import React from 'react'

import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks'
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from '@reduxjs/toolkit/query'
import { Dropdown, MenuProps, Space } from 'antd'

import avaIcon from '../../../assets/pictures/avatar.jpg'
import { StyledUserBlock } from '../../style/header'

type Props = {
  logOut: MutationTrigger<
    MutationDefinition<
      {},
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
      'me',
      void,
      'registration/api'
    >
  >
  name?: string
  avatar?: string
}
export const UserBlock = ({ logOut, avatar, name }: Props) => {
  const items: MenuProps['items'] = [
    {
      label: 'Logout',
      key: '0',
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
