const userReducer = (state = null, action) => {
    switch (action.type) {
      case 'SAVE_USER':
        return action.user
      case 'CLEAR_USER':
        return action.user
      default: 
        return state
    }
  }
  
  
export const saveUser = (user) => {
    return async dispatch => {
      dispatch({
        type: 'SAVE_USER',
        user
      })
  }
}

export const clearUser = () => {
    return async dispatch => {
      dispatch({
        type: 'CLEAR_USER',
        user: null
      })
  }
}
  

export default userReducer