import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import './Header.less'

const Header = ({ history }) => {
  return (
    <header className="Header">
      <div className="Header__content">
        <button
          className="Header__btn"
          type="button"
          onClick={history.goBack}
          >
        </button>
      </div>
    </header>
  )
}

export default withRouter(Header)
