import React from 'react'

import error404 from '../../../assets/pictures/error404.jpg'

export const Error404 = () => {
  return (
    <div style={{ display: 'flex' }}>
      <img src={error404} alt="404" style={{ width: '65%', margin: '0 auto' }} />
    </div>
  )
}
