import React, { useState, useImperativeHandle } from 'react'
import Button, {StyledButton} from '../components/Button'
import styled from 'styled-components'


const StyledPostContainer = styled.div`
  border-bottom: 2px solid ${props => props.theme.primary};;
  padding-bottom: 30px;
  button {
    margin: 5px;
  }
  transition: 3s;
`

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <StyledButton onClick={toggleVisibility}>{props.buttonLabel}</StyledButton>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <StyledPostContainer>
        {props.children}
          <Button handleClick={toggleVisibility} label="cancel"/>
        </StyledPostContainer>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable