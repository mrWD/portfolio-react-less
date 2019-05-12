import { GET_CARDS, GET_CARDS_SUCCESS, GET_CARDS_ERROR, GET_CARD, GET_CARD_SUCCESS, GET_CARD_ERROR } from '../constants/actionStatus'

export function getCards() {
  return {
    type: GET_CARDS,
  }
}

export function getCardsSuccess(payload) {
  return {
    type: GET_CARDS_SUCCESS,
    payload,
  }
}

export function getCardsError(payload) {
  return {
    type: GET_CARDS_ERROR,
    payload,
  }
}

export function getCard() {
  return {
    type: GET_CARD,
  }
}

export function getCardSuccess(payload) {
  return {
    type: GET_CARD_SUCCESS,
    payload,
  }
}

export function getCardError(payload) {
  return {
    type: GET_CARD_ERROR,
    payload,
  }
}
