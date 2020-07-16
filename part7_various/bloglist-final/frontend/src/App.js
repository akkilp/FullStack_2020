import React, { useEffect } from 'react'
import styled, {createGlobalStyle} from 'styled-components'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import InfoPage from './components/InfoPage'
import User from './components/User'
import Button, {StyledButton} from './components/Button'
import DetailedBlog from './components/DelaitedBlog'

import loginService from './services/login'
import storage from './utils/storage'

import { useField } from './hooks/index'

import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from './redux/reducers/notificationReducer'
import { initializeBlogs, createNewBlog, updateLike, removeBlog } from './redux/reducers/blogReducer'
import { saveUser, clearUser } from './redux/reducers/userReducer'

import { Switch, Route, useHistory, Link} from "react-router-dom"


const MainPage = styled.div`
@media only screen and (min-width: 1500px) {
  padding: 0 20%;
}

@media only screen and (min-width: 1000px and max-width: 1500px) {
  padding: 0 10%;
}

min-height: 100vh;
box-sizing: border-box;
padding 0 7%;
`

const GlobalStyle = createGlobalStyle`
html {
  font-size:20px;
  margin: 0;
}

body {
  font-family: "Arial";
  font-style: normal;
  color: ${props => props.theme.primary};
  margin: 0;
}  

`

const NavBar = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  width: 100%;
  height: 3em;
  background-color: ${props => props.theme.support};
  color: ${props => props.theme.primary};
  border: solid 1px ${props => props.theme.primary};
  border-top: none;
  border-radius: 0px 0px 20px 20px; 
  * {
    margin: 0px 20px;
  }
  p {
    font-size: 0.6rem;
  }

  @media only screen and (max-width: 800px) {
    * {
      margin: 0px 0px 0px 0px;
    }
    :nth-child(1) > :nth-child(1) > :nth-child(1){
      margin: 0px 20px 0px 0px;
    }
  }

`



const LoginPage = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
  padding-top: 5%;
`

const Container = styled.div`
  
  box-sizing: border-box;
  align-self: center;
  border: ${props => (props.withBorder ? `2px solid ${props.theme.secondary}}` : 'none')};
  padding: 30px;
  border-radius: 20px;
`


const Header = styled.h2`
  font-size: 2.5rem;
`

const LoginInput = styled.div`
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

const NavBarLink = styled(Link)`
  color: ${props => props.theme.primary};
  text-transform: uppercase;
  text-decoration: none;
  transition: 0.3s;
  :hover {
    color: ${props => props.theme.secondary};
  }

`


const App = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const username = useField('username')
  const password = useField('password')

  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    dispatch(saveUser(user))
  }, [dispatch])

  const notifyWith = (message, isErr = false) => {
    dispatch(setNotification({ message: message, isErr }))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value, password: password.value
      })
      username.clear()
      password.clear()

      dispatch(saveUser(user))
      notifyWith(`${user.name} welcome back!`)
      storage.saveUser(user)
    } catch (exception) {
      notifyWith('wrong username/password', true)
    }
  }

  const createBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createNewBlog(blog))
      notifyWith(`a new blog '${blog.title}' by ${blog.author} added!`)
    } catch (exception) {
      notifyWith(exception, true)
      console.log(exception)
    }
  }

  const handleLike = async (id) => {
    const targetBlog = blogs.find(blog => blog.id === id)
    dispatch(updateLike({
      ...targetBlog,
      likes: targetBlog.likes + 1,
      user: targetBlog.user.id
    })
    )
    notifyWith(`Blog ${targetBlog.title} liked.`)
  }

  const handleRemove = async (id) => {
    try{
      const blogToRemove = blogs.find(b => b.id === id)
      const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
      if (ok) {
      dispatch(removeBlog(id))
      history.push('/')
      notifyWith(`Blog '${blogToRemove.title}' removed.`)
    }
    } catch(err){
      notifyWith("Remove failed", true)
    }
  }

  const handleLogout = () => {
    dispatch(clearUser())
    storage.logoutUser()
    notifyWith(`Logged out`)
  }

  const fixedInput = ({ clear, ...rest }) => rest

  if (!user) {
    return (
      <>
      <GlobalStyle/>
      <LoginPage>
        <Container>
          <Header>
            Login to application
          </Header>
        </Container>

        <Container withBorder>
          <form onSubmit={handleLogin}>
            <LoginInput>
              <label>username</label>
              <input {...fixedInput(username)} />
            </LoginInput>
            <LoginInput>
              <label>password</label>
              <input {...fixedInput(password)} />
            </LoginInput>
            <StyledButton floatRight>Login</StyledButton>
          </form>
        </Container>
      </LoginPage>
      <Notification />
      </>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <>
    <GlobalStyle/>
    <MainPage>
      <NavBar>
        <Container>
          <NavBarLink to='/'>Blogs</NavBarLink>
          <NavBarLink to='/users'>Users</NavBarLink>
        </Container>
        
        <Container>
          <p>{user.name} logged in</p>
          <Button label="Log Out" inverted handleClick={handleLogout}/>
        </Container>

      </NavBar>

      <Header>
            Blogs
      </Header>

      <Switch>
        <Route exact path='/'>
          <Container withBorder>
            <Togglable buttonLabel='create new blog' ref={blogFormRef}>
              <NewBlog createBlog={createBlog} />
            </Togglable>

          
            {blogs.sort(byLikes).map(blog =>
              <Blog
              key={blog.id}
              blog={blog}
              />
              )}

          </Container>
        </Route>
      
        <Route exact path='/blogs/:id'>
            <DetailedBlog handleLike={handleLike} handleRemove={handleRemove}/>
        </Route>

        <Route exact path='/users'>
          <InfoPage />
        </Route>

        <Route path='/users/:id'>
          <User />
        </Route> 

      </Switch>

    </MainPage>
    <Notification />
    </>
  )

  
}

export default App