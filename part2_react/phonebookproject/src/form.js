import React, { useState } from 'react'
import {Button, Header, Input} from "./utils"


export const Form = ({persons, handleUpdate, handleCreate}) => {
    const [data, setData] = useState({name: '', number: ''})
    
    const handleChange = (event) => {
      const {value, name} = event.target;
      setData({...data, [name]: value})
    }
    
    const handleSubmit = (event) => {
      event.preventDefault()
      const personExists = persons.find(person => person.name.toUpperCase()===data.name.toUpperCase())
      const newObject = {
        name: data.name,
        number: data.number,
        id: personExists? personExists.id : Date.now()
      }
      personExists ?
        (
        window.confirm("Contact already exists. Replace the existing data with current input?") && handleUpdate(newObject)
        ):(
        handleCreate(newObject)
        )       
      setData({name:'',number:''}) 
    }
     
    
      return(
        <>
          <Header text="New contact"/>
          <form onSubmit={handleSubmit}>
            <Input name="name" handleChange={handleChange} value={data.name}/>
            <Input name="number" handleChange={handleChange} value={data.number}/>
            <Button type="submit" text="add"/>
          </form>
        </>
      )
    }
