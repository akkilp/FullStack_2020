import React, { useState } from 'react'
import Input from './Input'

const initializePost = { title: '', url: '', author: '' }

const NewBlogContainer = ({ handleNewPost }) => {
  const [input, setInput] = useState(initializePost)

  const handleChange = (target) => {
    setInput({ ...input, [target.name]:target.value })
  }

  const addPost = (event) => {
    const { title, url, author } = input
    event.preventDefault()
    handleNewPost({
      title: title,
      url: url,
      author: author
    })
    setInput(initializePost)
  }

  return(
    <>
      <h2>Create New Blog Post</h2>
      <form onSubmit={addPost}>
        <Input title="title" type="text" value={input.title} name="title" handleChange={handleChange}/>
        <Input title="author" type="text" value={input.author} name="author" handleChange={handleChange}/>
        <Input title= "url" type="text" value={input.url} name="url" handleChange={handleChange}/>
        <button type="submit">Submit Post</button>
      </form>
    </>
  )
}
export default NewBlogContainer
