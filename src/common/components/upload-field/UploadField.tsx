import React from 'react'

import { UploadOutlined } from '@ant-design/icons'
import { Button, Upload } from 'antd'
import { RcFile } from 'antd/es/upload'

import { dummyRequest } from '../../utils/dummy-request'

type Props = {
  onRemove: () => void
  beforeUpload: (file: RcFile) => void
  img: string | null
}

export const UploadField = ({ onRemove, beforeUpload, img }: Props) => {
  return (
    <div>
      <Upload
        onRemove={onRemove}
        customRequest={dummyRequest}
        beforeUpload={beforeUpload}
        listType="picture"
        accept={'image/png' || 'image/jpeg'}
        maxCount={1}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
      <br />
    </div>
  )
}
