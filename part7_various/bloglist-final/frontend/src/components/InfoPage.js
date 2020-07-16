import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import {getUsers} from '../redux/reducers/infoReducer'

import {Link, Route} from "react-router-dom"

const InfoPage = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const users = useSelector(state=>{
    if(!state.info.allUsers) return null
    const userList = state.info.allUsers.reduce((total, item)=>{
      return total.concat({name: item.name, blogs: item.blogs.length, id: item.id})
    },[])
    return userList.sort((a,b)=>a.blogs>b.logs? 1 : -1)
  })
  
  if(!users) return null



  return(
    <table>
      <tbody>

        <tr>
          <th>Name</th>
          <th>Blogs created</th>
        </tr>
        {users.map(current => {
          return (
            <tr key={current.name}>
              <td>
                <Link to={`/users/${current.id}`}>
                  {current.name}
                </Link>
              </td>
              <td>{current.blogs}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default InfoPage



  
