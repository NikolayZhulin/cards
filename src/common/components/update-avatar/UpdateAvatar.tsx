import React from 'react'

import { CloudUploadOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { Button, Upload } from 'antd'

import { UpdateIcon } from '../../style'

type Props = {
  onChangeUserHandler: (name?: string, avatar?: string) => void
  onError: (error: string) => void
  maxSize: number
}

export const UpdateAvatar: React.FC<Props> = ({ onChangeUserHandler, onError, maxSize }) => {
  const customRequest = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      onSuccess('ok')
    }, 0)
  }
  const onChangeHandler: UploadProps['onChange'] = info => {
    if (info.file.status === 'done') {
      if (info.file.originFileObj && info.file.originFileObj.size < maxSize) {
        const reader = new FileReader()

        reader.readAsDataURL(info.file.originFileObj as Blob)

        reader.onloadend = async () => {
          const file64 = (await reader.result) as string

          onChangeUserHandler(undefined, file64)
        }
      } else {
        onError('File must be less then 100 kb')
      }
    }
  }

  return (
    <UpdateIcon>
      <Upload
        onChange={onChangeHandler}
        customRequest={customRequest}
        maxCount={1}
        showUploadList={false}
        accept={'image/*'}
      >
        <Button icon={<CloudUploadOutlined />}></Button>
      </Upload>
    </UpdateIcon>
  )
}
