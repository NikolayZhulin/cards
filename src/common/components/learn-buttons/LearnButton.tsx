import React from 'react'

import { FolderOpenTwoTone, FolderOutlined, FolderTwoTone } from '@ant-design/icons'
import { bool } from 'yup'

type LearnButtonPropsType = {
  isCardCount: boolean
  startLearnHandler: () => void
}

export const LearnButton = ({ isCardCount, startLearnHandler }: LearnButtonPropsType) => {
  if (!isCardCount) {
    return <FolderTwoTone style={{ fontSize: '20px', margin: '5px' }} />
  }
  // if (disable) {
  //   return <FolderOutlined disabled style={{ fontSize: '20px', margin: '5px' }} />
  // }

  return (
    <FolderOpenTwoTone style={{ fontSize: '20px', margin: '5px' }} onClick={startLearnHandler} />
  )
}
