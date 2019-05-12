import React, { Component } from 'react'
import Card from '../Card'
import Dropdown from '../Dropdown'
import Loader from '../Loader'
import ErrorBlock from '../ErrorBlock'

import './CardList.less'

const typesList = [
  { value: 'Artifact', title: 'Artifact' },
  { value: 'Enchantment', title: 'Enchantment' },
  { value: 'Instant', title: 'Instant' },
  { value: 'Land', title: 'Land' },
  { value: 'Sorcery', title: 'Sorcery' },
]
const subTypesList = [
  { value: 'Angel', title: 'Angel' },
]
const superTypesList = [
  { value: 'Legendary', title: 'Legendary' },
]
const sortByList = [
  { value: 'name', title: 'Name' },
  { value: 'type', title: 'Type' },
  { value: 'subtypes', title: 'Subtypes' },
  { value: 'supertypes', title: 'Supertypes' },
  { value: 'rarity', title: 'Rarity' },
  { value: 'number', title: 'Number' },
]

const checkIncluding = (target, value) => {
  if (!value || !target) return true

  const isValueString = typeof value === 'string'
  const isTargetString = typeof target === 'string'

  if (isTargetString && isValueString) {
    return target.toLowerCase().includes(value.toLowerCase())
  }

  if (isValueString) {
    return target.includes(value.toLowerCase())
  }

  return value.some(item => target.includes(item))
}

class CardList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filterName: '',
      filterType: '',
      filterSubtype: '',
      filterSupertype: '',
      sortBy: 'name',
    }
  }

  componentDidMount() {
    this.props.getCardList()
  }

  submitHandler = e => {
    e.preventDefault()

    const formData = new FormData(e.target)

    formData.forEach((value, key) => {
      this.toggleSelected(value, key)
    })
  }

  toggleSelected = (value, key) => {
    this.setState({
      [key]: value,
    })
  }

  render() {
    const {
      props: { error, cardList },
      state: { filterName, filterType, filterSubtype, filterSupertype, sortBy }
    } = this

    if (!cardList && !error) return <Loader />

    if (error) return <ErrorBlock error={error} />

    const filteredList = cardList.filter((item, i) => {
      const { imageUrl, name, type, subtypes, supertypes, rarity } = item

      const isValidName = checkIncluding(filterName, name)
      const isValidType = checkIncluding(filterType, type)
      const isValidSubtype = checkIncluding(filterSubtype, subtypes)
      const isValidSupertype = checkIncluding(filterSupertype, supertypes)

      return imageUrl && isValidName && isValidType && isValidSubtype && isValidSupertype
    })

    const sortedList = filteredList.sort((item1, item2) => {
      const firstVal = item1[sortBy]
      const secondVal = item2[sortBy]

      if (isNaN(firstVal)) {
        return firstVal > secondVal
      }

      return Number(firstVal) - Number(secondVal)
    })

    const reviewsList = sortedList.map(({ id, imageUrl, name }, i) => {
      return (
        <Card
          id={id}
          imageUrl={imageUrl}
          name={name}
          key={i}
        />
      )
    })

    return (
      <div className="CardList">
        <form className="CardList__filters" onSubmit={this.submitHandler}>
          <div className="CardList__field-wrap">
            <input
              className="CardList__field"
              type="text"
              name="filterName"
              placeholder="Enter name"
              />
          </div>

          <div className="CardList__field-wrap">
            <Dropdown
              multiple
              title="All Types"
              name='filterType'
              items={typesList}
              toggleItem={this.toggleSelected}
            />
          </div>

          <div className="CardList__field-wrap">
            <Dropdown
              multiple
              title="All Subtypes"
              name='filterSubtype'
              items={subTypesList}
              toggleItem={this.toggleSelected}
            />
          </div>

          <div className="CardList__field-wrap">
            <Dropdown
              multiple
              title="All Supertypes"
              name='filterSupertype'
              items={superTypesList}
              toggleItem={this.toggleSelected}
            />
          </div>

          <div className="CardList__field-wrap">
            <Dropdown
              title="Sort By"
              name="sortBy"
              items={sortByList}
              toggleItem={this.toggleSelected}
            />
          </div>

          <div className="CardList__field-wrap">
            <button className="CardList__btn" type="submit">Search</button>
          </div>

          <p className="CardList__text">
            Found: {reviewsList.length} cards
          </p>
        </form>

        {reviewsList}
      </div>
    )
  }
}

export default CardList
