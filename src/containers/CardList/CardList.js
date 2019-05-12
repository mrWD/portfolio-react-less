import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import getCardList from '../../actions/cardListAction'

import CardList from '../../components/CardList'

const mapStateToProps = ({ cards }) => ({
  error: cards.error,
  cardList: cards.cardList,
})

const mapDispatchToProps = dispatch => ({
  getCardList: bindActionCreators(getCardList, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(CardList)
