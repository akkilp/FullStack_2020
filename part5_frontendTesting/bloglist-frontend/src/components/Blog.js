import React, { useState } from 'react'
import Button from './Button'


const Blog = ({ user, blog, handleLike, handleRemove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const passNewObject = (event) => {
    event.preventDefault()
    handleLike({
      title: blog.title,
      author: blog.author,
      id: blog.id,
      url: blog.url,
      likes: blog.likes+1,
      user: blog.user.id
    })

  }

  const [showInfo, setShow] = useState(false)


  const allInfo = () => {

    const isCreator = () => {
      return user.username === blog.user.username
        ? <Button blue={true} label="Remove" handleClick={() => handleRemove(blog.id)}/>
        : null
    }

    return(
      <ul>
        <li>{blog.url} </li>
        <li>{blog.likes} <Button label='Like' handleClick={passNewObject}/></li>
        <li>{blog.user.username} </li>
        {isCreator()}

      </ul>

    )
  }

  return(
    <div style={blogStyle}>
      <h3>
        {blog.title}
        {blog.author}
        <button onClick={() => setShow(!showInfo)}>{showInfo ? 'Hide' : 'View'}</button>
      </h3>
      {showInfo ? allInfo() : null}
    </div>
  )
}


export default Blog
