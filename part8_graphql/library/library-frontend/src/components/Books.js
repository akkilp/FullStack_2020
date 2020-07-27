import React, {useEffect, useState} from 'react'
import {useLazyQuery} from '@apollo/client'
import {ALL_BOOKS} from '../queries'




const Books = ({show, books}) => {
  
const [categories, setCategories] = useState('')
const [filtered, setFilter] = useState(books.allBooks)

useEffect(()=>{
  if(books.allBooks && books.allBooks.length>1){
    setCategories(getCategories(books.allBooks))
  }
}, [books.allBooks])

    

const getCategories = (arr) => {
  return arr
    .reduce((total,curr)=>total.concat(curr.genres), [])
    .filter((item,index,array) => array.indexOf(item)===index)
}

if (!show) {
  return null
}

if(!books.allBooks || !books.allBooks.length>0) return <h2>Loading</h2>

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filtered.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {categories&&categories.length>1 
        ? categories.map(item => <button key={item} onClick={()=> setFilter(books.allBooks.filter(book=>book.genres.indexOf(item)!==-1))}>{item}</button>) 
        : null
      }
      
    
    </div>
  )
}

export default Books