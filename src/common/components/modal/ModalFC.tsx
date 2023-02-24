import React, { ReactNode, useState } from 'react'

import { Modal } from 'antd'

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
    <Modal
      open={isOpen}
      onOk={handleOk}
      confirmLoading={isLoading}
      onCancel={handleCancel}
      okText={okText}
      okButtonProps={{ danger: danger, disabled: isLoading }}
      cancelButtonProps={{ disabled: isLoading }}
      closable={false}
      centered={true}
      style={{ width: '400px' }}
      afterClose={afterClose}
    >
      {children}
    </Modal>
  )
}
