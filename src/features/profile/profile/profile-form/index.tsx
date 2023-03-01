import React from 'react'

import { LogoutOutlined } from '@ant-design/icons'
import { Button } from 'antd'

import { setAppErrorAC } from '../../../../app'
import avaIcon from '../../../../assets/pictures/avatar.jpg'
import { EditableSpan, Preloader } from '../../../../common/components'
import { UpdateAvatar } from '../../../../common/components/update-avatar/UpdateAvatar'
import { useAppDispatch } from '../../../../common/hooks/reduxHooks'
import { AvaContainer, FormTitle, FormWrapper } from '../../../../common/style'
import { useProfile } from '../hooks/useProfile'

export const ProfileForm = () => {
  const { data, isLoading, logOutHandler, onChangeUserHandler, userIsUpdating, isSuccess } =
    useProfile()
  const dispatch = useAppDispatch()
  const imgErrorHandler = () => {
    dispatch(setAppErrorAC({ error: 'Avatar is broken' }))
  }
  const imgLoadHandler = () => {
    dispatch(setAppErrorAC({ error: null }))
  }
  const onErrorHandler = (error: string) => {
    dispatch(setAppErrorAC({ error }))
  }

  if (isLoading) return <Preloader />

  return (
    <FormWrapper>
      <FormTitle>Personal information</FormTitle>
      <AvaContainer>
        <div>
          {userIsUpdating ? (
            <Preloader size={100} />
          ) : (
            <img
              src={data?.avatar || avaIcon}
              alt="photo"
              style={{ height: '100px', borderRadius: '50%' }}
              onError={imgErrorHandler}
              onLoad={imgLoadHandler}
            />
          )}
        </div>
        <UpdateAvatar
          onError={onErrorHandler}
          onChangeUserHandler={onChangeUserHandler}
          maxSize={100000}
        />
      </AvaContainer>
      <EditableSpan
        value={data?.name ? data?.name : 'unknown'}
        onChange={onChangeUserHandler}
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
