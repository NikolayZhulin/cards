import React from 'react'

import { FolderOpenTwoTone, FolderTwoTone } from '@ant-design/icons'

type LearnButtonPropsType = {
  isCardCount: boolean
}

export const LearnButton = ({ isCardCount }: LearnButtonPropsType) => {
  if (!isCardCount) {
    return <FolderTwoTone style={{ fontSize: '20px', margin: '5px' }} />
  }

  return <FolderOpenTwoTone disabled={true} style={{ fontSize: '20px', margin: '5px' }} />
}
