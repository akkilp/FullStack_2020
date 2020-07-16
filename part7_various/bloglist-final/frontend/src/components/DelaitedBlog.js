import React, { useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import {getSingleBlog} from '../redux/reducers/infoReducer'
import {createComment} from '../redux/reducers/blogReducer'
import {useParams} from "react-router-dom"
import {useField} from '../hooks/index'
import Button, {StyledButton} from './Button'


const DetailedBlog = ({handleLike, handleRemove}) => {

  const dispatch = useDispatch()
  const id=useParams().id

  const comment = useField('comment')

  useEffect(() => {
    dispatch(getSingleBlog(id))
  }, [dispatch])
  
const handleComment = event => {
    event.preventDefault()
    dispatch(createComment(id, {comment: comment.value}))
    comment.clear()
}

    const blogData = useSelector(state=>{
        let target = state.blogs.find(blog=>blog.id===id)
        return target ? target : null
    })
    console.log(blogData)


  const owner = useSelector(state=>{
    if(!blogData) return null
    return state.user.username===blogData.user.username ? state.user.username : null
  }
)



const fixedInput = ({ clear, ...rest }) => rest

  console.log(blogData)
  if(!blogData ) return null
  return(
    <>
        <h2>{blogData.title} by {blogData.author}</h2>
        <a href={blogData.url}>{blogData.url}</a>
        <p>
          {blogData.likes} 
           <Button handleClick={()=>handleLike(blogData.id)} label='like'/>
        </p>
        <p>Added by {blogData.user.name}</p>
        {owner 
          ? <Button handleClick={()=>handleRemove(blogData.id)} label='remove'/>
          : null }
        <h3>Comments: </h3>
        <ul>
            {blogData&&blogData.comments&&blogData.comments.length>0 
              ? blogData.comments.map(comment=> <li>{comment}</li>) 
              : <p>No comments</p>}
        </ul>
        <form onSubmit={handleComment}> 
            Post comment
            <input {...fixedInput(comment)}/>
            <StyledButton>Post</StyledButton>
        </form>
    </>
  )
}

export default DetailedBlog



  
