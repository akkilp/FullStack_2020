import React from 'react'

const Button = ({ label, handleClick, blue }) => {

  let buttonStyle = {

  }


  if(blue){
    buttonStyle= {
      backgroundColor: 'blue',
      color: 'white'
    }
  }

  return(
    <>
      <button style={buttonStyle} onClick={handleClick}>{label}</button>
    </>
  )
}

export default Button