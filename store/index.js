import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
  // access_token : '',
  ongoingTransaction: {}
  // userType = '',
  // customer = {},
  // kangCukur = {}
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    // case 'SET_ACCESS_TOKEN':
    //   return { ...accessToken, access_token: action.payload.access_token }
    case 'SET_ONGOING_TRANSACTION':
      // console.log(action.payload, 'di reducerss')
      return { ...state, ongoingTransaction: action.payload }
    default:
      return state
  }
}

const store = createStore(reducers, applyMiddleware(thunk))

export default store