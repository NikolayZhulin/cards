import React from 'react'

import { FolderOpenTwoTone, FolderOutlined, FolderTwoTone } from '@ant-design/icons'
import { bool } from 'yup'

type LearnButtonPropsType = {
  isCardCount: boolean
  // disable: boolean
}

export const LearnButton = ({ isCardCount }: LearnButtonPropsType) => {
  if (!isCardCount) {
    return <FolderTwoTone style={{ fontSize: '20px', margin: '5px' }} />
  }
  // if (disable) {
  //   return <FolderOutlined disabled style={{ fontSize: '20px', margin: '5px' }} />
  // }

  return <FolderOpenTwoTone disabled={true} style={{ fontSize: '20px', margin: '5px' }} />
}
