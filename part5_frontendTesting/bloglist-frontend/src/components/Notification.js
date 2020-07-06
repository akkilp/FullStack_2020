import React from 'react'
const Notification = ({ message }) => {
  if(message.message && message.message.length>0){
    return(
      <div className={message.error ? 'message error': 'message'}>
        <p>{message.message}</p>
      </div>
    )
  } else return null
}

export default Notification