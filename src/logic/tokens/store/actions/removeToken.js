// @flow
import { createAction } from 'redux-actions'
import { type Token } from '~/logic/tokens/store/model/token'
import { removeTokenFromStorage, removeFromActiveTokens } from '~/logic/tokens/utils/activeTokensStorage'
import { type GlobalState } from '~/store/index'
import type { Dispatch as ReduxDispatch } from 'redux'

export const REMOVE_TOKEN = 'REMOVE_TOKEN'

type RemoveTokenProps = {
  safeAddress: string,
  token: Token,
}

const removeToken = createAction(
  REMOVE_TOKEN,
  (safeAddress: string, token: Token): RemoveTokenProps => ({
    safeAddress,
    token,
  }),
)

const deleteToken = (safeAddress: string, token: Token) => (dispatch: ReduxDispatch<GlobalState>) => {
  dispatch(removeToken(safeAddress, token))

  const tokenAddress = token.get('address')
  removeFromActiveTokens(safeAddress, tokenAddress)
  removeTokenFromStorage(safeAddress, token)
}

export default deleteToken
