import React from 'react'

import { LogoutOutlined } from '@ant-design/icons'
import { Button } from 'antd'

import avaIcon from '../../../../assets/pictures/avatar.jpg'
import { EditableSpan, Preloader } from '../../../../common/components'
import { FormTitle, FormWrapper } from '../../../../common/style'
import { useProfile } from '../hooks/useProfile'

export const ProfileForm = () => {
  const { data, isLoading, logOutHandler, onChangeHandler, isSuccess } = useProfile()

  if (isLoading) return <Preloader />

  return (
    <FormWrapper>
      <FormTitle>Personal information</FormTitle>
      <div>
        <img
          src={data?.avatar || avaIcon}
          alt="photo"
          style={{ height: '100px', borderRadius: '50%' }}
        />
      </div>
      <EditableSpan
        value={data?.name ? data?.name : 'unknown'}
        onChange={onChangeHandler}
        isSuccess={isSuccess}
      />
      <div>{data?.email}</div>
      <div>
        <Button
          icon={<LogoutOutlined />}
          onClick={logOutHandler}
          type={'default'}
          htmlType={'button'}
          style={{ width: '100%' }}
        >
          Log out
        </Button>
      </div>
    </FormWrapper>
  )
}
