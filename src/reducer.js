

const reducer = (state = {}, action) => {

  const newState = Object.assign({}, state)

  switch (action.type) {
    case 'SET_ACTIVE_PAGE':
      newState.page = action.page
      break
    case 'SET_DIMS':
      newState.width = action.width
      newState.height = action.height
      break
  }

  return newState
}

module.exports = reducer
