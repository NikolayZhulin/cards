import React, { ReactNode } from 'react'

import { StyledModal } from '../../style/modal-styles'

type PropsType = {
  children?: ReactNode
  handleOk: () => void
  handleCancel: () => void
  isLoading: boolean
  isOpen: boolean
  okText: string
  danger: boolean
  afterClose?: () => void
}

export const ModalFC = ({
  children,
  isLoading,
  handleOk,
  isOpen,
  okText,
  handleCancel,
  danger,
  afterClose,
}: PropsType) => {
  return (
    <StyledModal
      open={isOpen}
      onOk={handleOk}
      confirmLoading={isLoading}
      onCancel={handleCancel}
      okText={okText}
      okButtonProps={{ danger: danger, disabled: isLoading }}
      cancelButtonProps={{ disabled: isLoading }}
      centered={true}
      afterClose={afterClose}
    >
      {children}
    </StyledModal>
  )
}
