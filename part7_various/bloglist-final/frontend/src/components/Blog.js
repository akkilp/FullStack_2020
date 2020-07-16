import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const BlogItem = styled.div`
  display:flex;
  justify-content: center;
  padding: 20px 5px 5px;
  margin-top: 10px;
  border-bottom: 1px solid ${props=> props.theme.secondary};;
  border-right: 1px solid ${props=> props.theme.secondary};;

  a:nth-child(1) {
    padding: 0 10px;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: ${props=> props.theme.primary};
    transition: 0,2s;
  }
  a:nth-child(1):hover {
    color: ${props=> props.theme.secondary};
    transition: 0.05s;
  }
  a:nth-child(1)>div {
    width: 100%;
    height: 100%;
    display:flex;
    flex-flow: column;
    flex-wrap: no-wrap;
    justify-content: space-between;

  }
  a:nth-child(1)>div>i {
    font-size: 1.3rem;
    overflow: hidden;
  }
`

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  

  return (
    <BlogItem>
        <Link to={`/blogs/${blog.id}`}>
          <div>
            <i>"{blog.title}"</i> <span> by {blog.author}</span>
          </div>
        </Link>
    </BlogItem>
  )
}



export default Blog