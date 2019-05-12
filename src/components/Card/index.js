import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Card.less'

class Card extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isExist: true,
      activeClass: '',
    }
  }

  errorHandler = e => {
    this.setState({
      isExist: false,
    })
  }

  successHandler = e => {
    this.setState({
      activeClass: 'is-visible',
    })
  }

  render() {
    const {
      props: { id, imageUrl, name },
      state: { isExist, activeClass },
      errorHandler,
      successHandler
    } = this

    if (!isExist || !imageUrl) return null

    return (
      <article className={`Card ${activeClass}`}>
        <Link to={`/${id}`} className="Card__img-wrapper">
          <img
            className="Card__img"
            src={imageUrl}
            alt={name || ''}
            width="233"
            onError={errorHandler}
            onLoad={successHandler}
          />
        </Link>
      </article>
    )
  }
}

export default Card
