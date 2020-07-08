var timeoutID
  
export const messageChange = (message, timeOut) => {
  return async dispatch => {
    dispatch({
      type: 'SET_MESSAGE',
      message,
    })
    clearTimeout(timeoutID)
    timeoutID = window.setTimeout(()=>{
      dispatch(messageReset())
    }, timeOut*1000)   
  }
}
    
export const messageReset = () => {
  return {
    type: 'RESET_MESSAGE',
    message: '',
  } 
}
    
const messageReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.message
    case 'RESET_MESSAGE':
      return action.message
    default:
      return state
  }
}
    

  export default messageReducer