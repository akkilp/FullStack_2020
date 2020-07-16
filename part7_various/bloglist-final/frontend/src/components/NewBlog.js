import React, { useState } from 'react'
import styled from 'styled-components'
import {StyledButton} from '../components/Button'



const StyledInput = styled.div`
  position:relative;
  padding: 20px 5px;
  input{
    width: 100%;
    border: 0;
    border-bottom: 2px solid ${props => props.theme.secondary};
    outline: 0;
    font-size: 1rem;
    background: transparent;
    padding: 8px 0px 3px;
    margin: 2px;
    transition: border-color 0.3s;
  }
  input:focus {
    border-bottom: 2px solid ${props => props.theme.primary};
  }
  input:hover {
    border-bottom: 2px solid ${props => props.theme.primary};
  }
  label {
    font-size: 0.8em;
    text-transform: uppercase;
  }
`

const NewBlog = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()
    props.createBlog({
      title, author, url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
        <h2>create new</h2>
        <form onSubmit={handleNewBlog}>
          <StyledInput>
            author
            <input
              id='author'
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </StyledInput>
          <StyledInput>
            title
            <input
              id='title'
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </StyledInput>
          <StyledInput>
            url
            <input
              id='url'
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </StyledInput>
          <StyledButton>Create</StyledButton>
        </form>
    </>
  )
}

export default NewBlog