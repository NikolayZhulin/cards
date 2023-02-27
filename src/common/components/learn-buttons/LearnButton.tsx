import React from 'react'

import { FolderOpenTwoTone, FolderOutlined } from '@ant-design/icons'

type LearnButtonPropsType = {
  isCardCount: boolean
  startLearnHandler: () => void
}

export const LearnButton = ({ isCardCount, startLearnHandler }: LearnButtonPropsType) => {
  if (!isCardCount) {
    return <FolderOutlined style={{ fontSize: '20px', margin: '5px' }} />
  }

  return (
    <FolderOpenTwoTone style={{ fontSize: '20px', margin: '5px' }} onClick={startLearnHandler} />
  )
}
