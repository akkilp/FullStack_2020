import React from 'react'
import PropTypes from 'prop-types'

const Input = ({ title, type, value, name, handleChange }) => {
  return(
    <div>
      {title}
      <input
        id={name}
        type={type}
        value={value}
        name={name}
        onChange={({ target }) => handleChange(target)}
      />
    </div>
  )
}

Input.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
}

export default Input