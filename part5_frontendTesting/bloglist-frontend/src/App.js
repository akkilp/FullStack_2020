import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import LogInForm from './components/LogInForm'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'


import './App.css'

const initializeMessage = { error: false, message: '' }

const App = () => {

  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState({ error: false, message: null })

  useEffect(() => {
    try{
      (async() => {
        const blogData = await blogService.getAll()
        setBlogs(blogData)
      })()
    } catch(err){
      setMessage({ error: true, message: 'Fetching blogs failed' })
      setTimeout(() => {
        setMessage(initializeMessage)
      },5000)
    }
  },[])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedInCredentials')

    if(loggedUser){
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)
      setUser(user)
      setMessage({ error: false, message: `Welcome back, ${user.username}` })
      setTimeout(() => {
        setMessage(initializeMessage)
      },5000)
    }
  },[])

  const handleLogIn = async (loginCredentials) => {
    try{
      const user = await loginService.login(loginCredentials)
      window.localStorage.setItem('loggedInCredentials', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setMessage({ error: false, message: `Hello, ${user.username}!` })
    } catch(error){
      setMessage({ error: true, message: 'Wrong credentials!' })
      setTimeout(() => {
        setMessage(initializeMessage)
      },5000)
    }
  }

  const handleLogOut = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedInCredentials')
    setMessage({ error: false, message: 'Logged out' })
    setTimeout(() => {
      setMessage(initializeMessage)
    },5000)
  }

  const handleNewPost = async(newObject) => {
    try{
      const post = await blogService.create(newObject)
      console.log(post)
      setBlogs(blogs.concat(post))
      setMessage({ error: false, message: `New post '${newObject.title}' by author ${newObject.author} created.` })
      setTimeout(() => {
        setMessage(initializeMessage)
      },5000)
    } catch(error){
      console.log(error.response.data)
      setMessage({ error: true, message: `${error.response.data.error}` })
      setTimeout(() => {
        setMessage(initializeMessage)
      },5000)
    }
  }

  const handleUpdate = async(updatedObject) => {
    try{
      const post = await blogService.update(updatedObject.id, updatedObject)
      const updatedBlogs = blogs.map(blog => blog.id !== post.data.id ? blog : post.data)
      setBlogs(updatedBlogs)
      setMessage({ error: false, message: `Liked post '${updatedObject.title}' by author ${updatedObject.author}.` })
      setTimeout(() => {
        setMessage(initializeMessage)
      },5000)
    }catch(error){

      setMessage({ error: true, message: 'Updating failed' })
      setTimeout(() => {
        setMessage(initializeMessage)
      },5000)
    }
  }

  const handleRemove = async(id) => {
    try{
      const findBlog = blogs.find(blog => blog.id === id)
      const confirm = window.confirm(`Are you sure you wanna delete post ${findBlog.title} by author ${findBlog.author}?`)
      if(confirm){
        await blogService.remove(findBlog.id)
        const updatedBlogs = blogs.filter(blog => blog.id!==findBlog.id)
        setBlogs(updatedBlogs)
        setMessage({ error: false, message:`${findBlog.title } by author ${findBlog.author} succesfully deleted.` })
        setTimeout(() => {
          setMessage(initializeMessage)
        },5000)
      }

    } catch(error){
      setMessage({ error: true, message:`${error.response.data.error}` })
      setTimeout(() => {
        setMessage(initializeMessage)
      },5000)
    }
  }

  const sortBlogs = () => {
    const sortedBlogs = blogs.sort((a,b) => {
      return a.likes > b.likes ? -1 : 1
    })
    return sortedBlogs
  }


  return (
    <div>
      <Notification message={message}/>
      <Header text={user ? 'blogs' : 'log in to application'}/>

      {user
        ?  <BlogList blogs={sortBlogs()} user={user} handleLogOut={handleLogOut} handleNewPost={handleNewPost} handleLike={handleUpdate} handleRemove={handleRemove} />
        :
        (
          <Togglable buttonLabel='login'>
            <LogInForm handleLogIn={handleLogIn}/>
          </Togglable>
        )
      }

    </div>
  )
}

export default App