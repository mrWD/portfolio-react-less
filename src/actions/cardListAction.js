import { getCards, getCardsSuccess, getCardsError } from './cardActions'

export default function getCardList() {
  return dispatch => {
    dispatch(getCards())

    return fetch('https://api.magicthegathering.io/v1/cards/', {
        method: 'GET'
      })
      .then(response => {
        if (response.status < 500) {
          return response.json()
        }

        throw new Error('An error has occurred. Please try again later.')
      })
      .then(data => {
        if (data.error) {
          throw new Error(data.status);
        }

        return dispatch(getCardsSuccess(data.cards))
      })
      .catch(({ message }) => {
        const error = errorMessages[message] || message

        return dispatch(getCardsError(error))
      })
  }
}
