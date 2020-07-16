import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import {getSingleUser} from '../redux/reducers/infoReducer'
import {useParams} from "react-router-dom"


const User = () => {
  const dispatch = useDispatch()
  const id=useParams().id

  useEffect(() => {
    dispatch(getSingleUser(id))
  }, [dispatch])
  
  const userInfo = useSelector(state=>state.info.targetUser)


  if(!userInfo) return null
  return(
    <>
      <h1>{userInfo.name}</h1>
      <h3> added blogs</h3>
      <ul>
        {userInfo.blogs.map(blog => {return(<li key={blog.id}>{blog.title}</li>)})}
      </ul>
    </>
  )
}

export default User



  
