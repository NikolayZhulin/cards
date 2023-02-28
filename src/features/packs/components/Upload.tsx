import React from 'react'

import { CloudUploadOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { Button, Upload } from 'antd'

import { useProfile } from '../../profile/profile/hooks/useProfile'

export const UploadFC: React.FC = () => {
  const { data, isLoading, logOutHandler, onChangeHandler, isSuccess } = useProfile()
  const props: UploadProps = {
    name: 'avatar',
    maxCount: 1,
    accept: 'image/*',
    showUploadList: false,
    customRequest: ({ file, onSuccess }: any) => {
      setTimeout(() => {
        onSuccess('ok')
      }, 0)
    },
    onChange: info => {
      if (info.file.status === 'done') {
        const reader = new FileReader()

        reader.onloadend = async () => {
          const file64 = (await reader.result) as string

          onChangeHandler(data?.name, file64)
        }
        reader.readAsDataURL(info.file.originFileObj as Blob)
      }
    },
  }

  return (
    <Upload {...props}>
      <Button icon={<CloudUploadOutlined />}></Button>
    </Upload>
  )
}
