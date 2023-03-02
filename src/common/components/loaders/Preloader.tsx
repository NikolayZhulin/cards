import React from 'react'

import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
type Props = {
  size?: number
}
export const Preloader = ({ size = 150 }: Props) => {
  const antIcon = <LoadingOutlined style={{ fontSize: size }} spin />

  return <Spin indicator={antIcon} />
}
