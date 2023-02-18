import React, { ReactNode } from 'react'

import { Modal } from 'antd'

type PropsType = {
  children?: ReactNode
  handleOk: () => void
  handleCancel: () => void
  loading: boolean
  open: boolean
  okText: string
  cancelText: string
  danger: boolean
}

export const ModalFC = ({
  children,
  loading,
  handleOk,
  handleCancel,
  open,
  okText,
  cancelText,
  danger,
}: PropsType) => {
  return (
    <Modal
      open={open}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={handleCancel}
      okText={okText}
      cancelText={cancelText}
      okButtonProps={{ danger: danger, disabled: loading }}
      cancelButtonProps={{ disabled: loading }}
      closable={false}
    >
      {children}
    </Modal>
  )
}
