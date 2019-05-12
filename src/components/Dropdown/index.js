import React, { Component } from 'react'
import Option from './Option'

import './Dropdown.less'

class Dropdown extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      selectedList: [],
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  handleClickOutside = ({ target }) => {
    const { wrapperRef, state, toggleList } = this

    if (wrapperRef && !wrapperRef.contains(target) && state.isOpen) {
      toggleList()
    }
  }

  setWrapperRef = node => {
    this.wrapperRef = node
  }

  toggleList = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }))
  }

  toggleValue = value => {
    const { multiple } = this.props
    const { selectedList } = this.state
    const isSelected = selectedList.includes(value)
    const newSelectedList = !multiple ? value : isSelected ?
      selectedList.filter(item => item !== value) :
      [...selectedList, value]

    this.setState({
      selectedList: newSelectedList,
    })
  }

  clearValue = () => {
    this.setState({
      selectedList: [],
    })
  }

  render() {
    const {
      props: { items, title, name, multiple },
      state: { isOpen, selectedList },
      toggleValue,
      setWrapperRef,
    } = this

    const fieldText = items.reduce((result, { value, title }) => {
      if (multiple && selectedList.includes(value) || selectedList === value) {
        return [...result, title]
      }

      return result
    }, [])

    const itemList = items.map((item, i) => {
      const { value, title } = item
      const isSelected = multiple ?
        selectedList.includes(value) :
        selectedList === value

      return (
        <Option
          selected={isSelected}
          title={title}
          value={value}
          name={name}
          onClick={toggleValue}
          key={i}
        />
      )
    })

    return (
      <div className={`Dropdown ${isOpen ? 'is-open' : ''}`} ref={setWrapperRef}>
        <input type="hidden" value={selectedList} name={name} />

        <button
          className="Dropdown__header"
          title={fieldText.join(', ') || title}
          type="button"
          onClick={() => this.toggleList()}
          >

          <div className="Dropdown__title">
            {fieldText.length ? fieldText.join(', ') : title}
          </div>
        </button>

        { !!fieldText.length && (
          <button
            className="Dropdown__clear"
            type="button"
            onClick={this.clearValue}
            >
          </button>
        )}

        { itemList && (
          <div className={`Dropdown__list ${isOpen && items ? 'is-open' : ''}`}>
            {itemList}
          </div>
        )}
      </div>
    )
  }
}

export default Dropdown
