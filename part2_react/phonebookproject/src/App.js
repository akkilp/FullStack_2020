import React, { useState, useEffect } from 'react'

import {SearchBox} from "./searchbox"
import {Form} from "./form"
import {Contacts} from "./Contacts"
import {Notification} from "./notification";

import "./App.css";

import manageDB from "./services"

const App = () => {

  const [persons, setPersons ] = useState([]) ;
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState({isErr: false, message: null})


  useEffect(() =>{
    manageDB
      .getAll()
      .then(response =>{
        setPersons(response)
      })
  },[])

const handleCreate = (newObject) => {
  manageDB
    .create(newObject)
    .then(returnedPerson =>{
      setPersons(persons.concat(returnedPerson))
      setMessage({isErr:false, message: `${newObject.name} added to contact list.`}) 
      setTimeout(()=>{
        setMessage({isErr: undefined, message: null})
    }, 5000)
    })
}

const handleDelete = (id,name) => {
  const deleteArr = persons.filter(person => person.id!==id)
  window.confirm(`Delete ${name}?`) && (
    manageDB
    .deletePerson(id)
    .then(()=>{
      setPersons(deleteArr)
      setMessage({isErr:false, message: `${name} deleted from contact list.`})
      setTimeout(()=>{
        setMessage({isErr: undefined, message: null})
    }, 5000)
    })
    .catch(error => {
      setMessage({isErr: true, message:"Something went wrong in deleting"})
    })
  ) 
}

const handleUpdate = (newObj) => {
  manageDB
    .update(newObj.id, newObj)
    .then(()=>{
      setPersons(persons.map(person=>person.id!==newObj.id ? person : newObj))
      setMessage({isErr:false, message: `${newObj.name} data updated.`})
    })
    .catch(error => {
      setMessage({isErr:true,message:`${newObj.name} already deleted`})
      setPersons(persons.filter(person=>person.id!==newObj.id))
      setTimeout(()=>{
        setMessage({isErr: undefined, message: null})
    }, 5000)
    })
}

const personsToShow = search.length>0 ? persons.filter(person => !person.name.toUpperCase().indexOf(search.toUpperCase())) : persons

  return (
    <div>
      <SearchBox search={search} setSearch={setSearch}/>
      <Form persons={persons} handleCreate={handleCreate} handleUpdate={handleUpdate}/>
      <Contacts persons={personsToShow} search={search} handleDelete={handleDelete}/>
      <Notification message={message} setMessage={setMessage}/>
    </div>
  )
}

export default App