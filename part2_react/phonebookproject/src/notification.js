import React from 'react';


export const Notification = ({message}) => {

    let className = 'msg'
    if(message.isErr===true){
        className = "error"
    }
    
    if (message.message === null) {
      return null
    }
  
    return (
      <div className={className}>
        {message.message}
      </div>
    )
  }

