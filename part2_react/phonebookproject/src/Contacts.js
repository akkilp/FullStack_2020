import React from 'react'
import {PersonCard, Button, Header} from './utils'

export const Contacts = ({persons, handleDelete}) => {

  const numberList = persons.map((person, i)=>{
    return (
      <PersonCard name={person.name} number={person.number} key={person.name} >
        <Button text="Delete" handleClick={() => handleDelete(person.id, person.name)}/>
      </PersonCard>
    )
  })

  return(
    <>
      <Header text="Contacts"/>
      {numberList}
    </>
  )
}

