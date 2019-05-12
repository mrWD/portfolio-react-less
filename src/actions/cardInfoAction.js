import errorMessages from '../constants/errorMessages'
import { getCard, getCardSuccess, getCardError } from './cardActions'

export default function getCardInfo(id) {
  if (!id) return

  return dispatch => {
    dispatch(getCard())

    return fetch(`https://api.magicthegathering.io/v1/cards/${id}`, {
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

        return dispatch(getCardSuccess(data.card))
      })
      .catch(({ message }) => {
        const error = errorMessages[message] || message

        return dispatch(getCardError(error))
      })
  }
}
