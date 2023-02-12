import React from 'react'

import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

export const InitialPreloader = () => {
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 150, position: 'fixed', width: '100%', top: '30%' }} spin />
  )

  return <Spin indicator={antIcon} />
}
