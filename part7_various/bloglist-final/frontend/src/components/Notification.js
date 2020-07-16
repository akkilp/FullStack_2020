import React from 'react'
import {useSelector} from 'react-redux'
import styled, {createGlobalStyle} from 'styled-components'


const NotificationBar = styled.div`
  box-sizing: border-box;
  position: fixed;
  display: flex;
  align-items: center;
  bottom: 0;

  width: 100%;
  background-color: ${props => props.theme.support};
  border: 2px solid ${props => props.theme.secondary};
  height: 100px;
  color: ${props => props.isErr ? 'red' : props.theme.primary};
  font-size: 1.5rem;
  border-radius: 30px 30px 0px 0px;
  padding-left: 20px;
`
const Notification = () => {

  const notification = useSelector(state => state.notification)

  if(!notification) return null

  return (
    <NotificationBar isErr={notification.isErr}>
      {notification.message}
    </NotificationBar>
  )
}

export default Notification