import { GET_CARDS, GET_CARDS_SUCCESS, GET_CARDS_ERROR, GET_CARD, GET_CARD_SUCCESS, GET_CARD_ERROR } from '../constants/actionStatus'

const initialState = {
  error: '',
  cardList: [],
  cardInfo: null,
};

export default ( state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CARDS:
      return {
        ...state,
        error: '',
        cardList: null,
      }

    case GET_CARDS_SUCCESS:
      return {
        ...state,
        cardList: payload,
      }

    case GET_CARDS_ERROR:
      return {
        ...state,
        error: payload,
      }

    case GET_CARD:
      return {
        ...state,
        error: '',
        cardInfo: null,
      }

    case GET_CARD_SUCCESS:
      return {
        ...state,
        cardInfo: payload,
      }

    case GET_CARD_ERROR:
      return {
        ...state,
        error: payload,
      }

    default:
      return state;

  }
}
