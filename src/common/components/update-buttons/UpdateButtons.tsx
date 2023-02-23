import React from 'react'

import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons'

type UpdateButtonsType = {
  isMyItem: boolean
  editHandler: () => void
  deleteHandler: () => void
}

export const UpdateButtons: React.FC<UpdateButtonsType> = ({
  isMyItem,
  editHandler,
  deleteHandler,
}) => {
  if (!isMyItem) return <></>

  return (
    <>
      <EditTwoTone onClick={editHandler} style={{ fontSize: '20px', margin: '5px' }} />
      <DeleteTwoTone onClick={deleteHandler} style={{ fontSize: '20px', margin: '5px' }} />
    </>
  )
}
