import React from 'react'

import './ErrorBlock.less'

const ErrorBlock = props => {
  const { error } = props

  if (!error) return null

  return (
    <div className="ErrorBlock">
      <p className="ErrorBlock__message">
        {error || 'Something went wrong'}
      </p>
    </div>
  )
}

export default ErrorBlock
