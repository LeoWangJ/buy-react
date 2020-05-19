const initState = {
  error: null
}
const types = {
  CLEAR_ERROR: "APP/CLEAR_ERROR"
}
export const actions = {
  clearError: () => ({
    types: types.CLEAR_ERROR
  })
}

const reducer = (state = initState, action) => {
  const { type, error } = action
  if (type === types.CLEAR_ERROR) {
    return { ...state, error: null }

  } else if (error) {
    return { ...state, error }
  }
  return state
}

export const getError = (state) => {
  return state.common.error
}
export default reducer



