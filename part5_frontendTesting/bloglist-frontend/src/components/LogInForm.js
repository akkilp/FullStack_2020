import React, { useState } from 'react'
import Input from './Input'

const initialize = { username: '', password: '' }

const LogInForm = ({ handleLogIn }) => {

  const [input, setInput] = useState(initialize)
  const { username, password } = input

  const handleChange = (target) => {
    setInput({ ...input, [target.name]:target.value })
  }

  const passCredentials = (event) => {
    event.preventDefault()
    console.log('juuh')
    handleLogIn({
      username: username,
      password: password
    })
    setInput(initialize)
  }

  return(
    <form onSubmit={passCredentials}>
      <Input
        title="username"
        type="text"
        value={username}
        name="username"
        handleChange={handleChange}
      />
      <Input
        title="password"
        type="password"
        value={password}
        name="password"
        handleChange={handleChange}
      />
      <button id='login-button' type="submit">login</button>
    </form>
  )
}
export default LogInForm
