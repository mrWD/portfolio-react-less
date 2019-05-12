import React from 'react'

import './Option.less'

const Option = props => {
  const { selected, value, title, name, onClick } = props

  return (
    <button
      className={`Option ${selected ? 'is-selected' : ''}`}
      onClick={() => onClick(value)}
      type="button"
      >
      {title}
    </button>
  )
}

export default Option
