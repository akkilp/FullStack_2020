import infoService from '../../services/info'

const infoReducer = (state = [], action) => {
    switch (action.type) {
      case 'GET_USERS':
        return {...state, allUsers: action.users}
      case 'GET_SINGLE_USER':
        return {...state, targetUser: action.data}
      case 'GET_SINGLE_BLOG':
        return {...state, targetBlog: action.data}
      default: 
        return state
    }
  }
  
export const getUsers = () => {
    return async dispatch => {
      const data = await infoService.getUsers()
      dispatch({
        type: 'GET_USERS',
        users: data
      })
  }
}

export const getSingleUser = (id) => {
    return async dispatch => {
        const data = await infoService.getSingleUser(id.toString())
        dispatch({
          type: 'GET_SINGLE_USER',
          data
        })
    }
}

export const getSingleBlog = (id) => {
    return async dispatch => {
        const data = await infoService.getSingleBlog(id)
        dispatch({
          type: 'GET_SINGLE_BLOG',
          data
        })
    }
}
  

  export default infoReducer