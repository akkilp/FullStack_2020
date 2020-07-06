import React from 'react'
import Blog from './Blog'
import Button from './Button'
import NewBlogContainer from './NewBlogContainer'
import Togglable from './Togglable'



const BlogList = ({ blogs, user, handleLogOut, handleNewPost, handleLike, handleRemove }) => {



  return(
    <>
      <p>
        {`${user.name} logged in.`}
        <Button label="Log out" handleClick={handleLogOut}/>
      </p>
      <Togglable buttonLabel='Create Post'>
        <NewBlogContainer handleNewPost={handleNewPost}/>
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove} user={user}/>
      )}
    </>
  )
}
export default BlogList
