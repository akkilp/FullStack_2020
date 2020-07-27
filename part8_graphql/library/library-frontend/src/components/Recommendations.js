import React, {useEffect, useState} from 'react'
import {useLazyQuery} from '@apollo/client'
import {FIND_RECOMMENDATIONS} from '../queries'




const Recommendations = ({show, books, userData}) => {

  const [getPerson, result] = useLazyQuery(FIND_RECOMMENDATIONS)


  const [fetchedBooks, setFetched] = useState(null)

  useEffect(()=> {
    if(userData){
      getPerson({ variables: {favGenre: `${userData.me.favoriteGenre}`} })
    }
  }, [userData])

  useEffect(()=> {
    if(result.data) {
      setFetched(result.data)
    }
  }, [result])

if (!show) {
  return null
}

  return (
    <div>
      <h2>recommendations</h2>
        <h4>Welcome {userData.me.username}</h4>
        <h4>book in your favorite genre: {userData?userData.me.favoriteGenre:'no favorite'}</h4>
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
           { fetchedBooks ? fetchedBooks.allBooks.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ): null }
        </tbody>
      </table>
    
    </div>
  )
}

export default Recommendations