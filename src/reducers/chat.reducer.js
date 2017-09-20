export default (state = {}, action) => {
  switch (action.type) {
    case 'POST_MSG_SUCCESS':
      return {
        ...state
      };
    case 'POST_MSG_FAILURE':
      return {
        ...state
      };
    case 'GET_MSG_SUCCESS':
      return {
        ...state
      };
    case 'GET_MSG_FAILURE':
      return {
        ...state
      };
    default:
      return state
  }
}
