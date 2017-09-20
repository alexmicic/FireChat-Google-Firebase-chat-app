const initialState = {
  signedIn: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        signedIn: true
      }

    case 'LOGIN_FAILURE':
      return {}

    case 'LOGOUT':
    return {
      ...state,
      signedIn: false
    }

    case 'LOGOUT_FAILURE':
      return state

    default:
      return state
  }
}
