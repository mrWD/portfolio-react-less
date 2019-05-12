import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import getCardInfo from '../../actions/cardInfoAction'

import Description from '../../components/Description'

const mapStateToProps = ({ cards }) => ({
  error: cards.error,
  cardInfo: cards.cardInfo,
})

const mapDispatchToProps = dispatch => ({
  getCardInfo: bindActionCreators(getCardInfo, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Description)
