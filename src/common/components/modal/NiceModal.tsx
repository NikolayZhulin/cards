import { ReactNode } from 'react'

import NiceModal, { create, useModal } from '@ebay/nice-modal-react'
import { Modal } from 'antd'

type Props = {
  children?: ReactNode
  handleOk: () => void
  handleCancel: () => void
  isLoading: boolean
  isOpen: boolean
  okText: string
  danger: boolean
}

export const MyNiceModal = ({
  children,
  isLoading,
  okText,
  danger,
  handleOk,
  handleCancel,
  isOpen,
}: Props) => {
  // Use a hook to manage the modal state

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
      // centered={true}
      style={{ width: '400px' }}
      // title="Hello Antd"
      // visible={modal.visible}
      // onCancel={() => modal.hide()}
      // afterClose={() => modal.remove()}
    >
      {children}
    </Modal>
  )
}
