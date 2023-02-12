import React from 'react'

import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

export const Preloader = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 150 }} spin />

  return <Spin indicator={antIcon} />
}
