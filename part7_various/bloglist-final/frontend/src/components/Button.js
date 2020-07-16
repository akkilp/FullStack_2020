import React from 'react'
import styled from 'styled-components'

export const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  float: ${props => props.floatRight ? 'right' : 'initial'};
  border: none;
  border-radius: 7px;
  background-color: ${props => props.inverted ? props.theme.secondary :props.theme.primary};
  color: ${props => props.inverted ? props.theme.primary : props.theme.secondary};
  font-size: 0.8em;
  text-transform: uppercase;
  transition: color 0.2s;

 :hover {
   color: ${props => props.theme.support};;
   transition: color 0.2s;
 }
 :focus{
   outline: 0;
   background-color: ${props => props.theme.secondary};
   color: ${props => props.theme.primary};
   transition: 0.1s;
 }
`

const Button = ({handleClick, label}) => {
  return (
    <StyledButton onClick={()=> handleClick()}>{label}</StyledButton>
  )
}



export default Button