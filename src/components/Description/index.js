import React, { Component } from 'react'
import Loader from '../Loader'
import ErrorBlock from '../ErrorBlock'

import './Description.less'

class Description extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeClass: '',
    }
  }

  componentDidMount() {
    const { match: { params: { id } }, getCardInfo } = this.props

    getCardInfo(id)
  }

  successHandler = e => {
    this.setState({
      activeClass: 'is-visible',
    })
  }

  render() {
    const { error, cardInfo } = this.props

    if (!cardInfo && !error) return <Loader />

    if (error) return <ErrorBlock error={error} />

    const {
      name,
      imageUrl,
      number,
      originalText,
      flavor,
      originalType,
      rarity,
      power,
      toughness
    } = cardInfo

    return (
      <div className={`Description ${this.state.activeClass}`}>
        <div className="Description__container">
          <img
            className="Description__img"
            src={imageUrl}
            alt={name || ''}
            width="233"
            onLoad={this.successHandler}
          />

          <div className="Description__info">
            <div className="Description__name-wrap">
              <h1 className="Description__name">
                {name}
              </h1>

              <p className="Description__number">
                {number}
              </p>
            </div>

            <h2 className="Description__type">
              {originalType}
            </h2>

            <p className="Description__rarity">
              Rarity : {rarity}
            </p>

            {(power || toughness) && (
              <ul className="Description__params">
                {power && (
                  <li className="Description__params__item">Power : {power}</li>
                )}

                {toughness && (
                  <li className="Description__params__item">Toughness : {toughness}</li>
                )}
              </ul>
            )}

            <p className="Description__text">
              Card Text : {originalText}
            </p>

            {flavor && (
              <p className="Description__text">
                Flavor Text : {flavor}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Description
