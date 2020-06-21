import {Header, Input} from "./utils"
import React from 'react'

export const SearchBox = ({search, setSearch}) => {

const handleChange = (event) => {
    setSearch(event.target.value)
}

    return(
      <>
        <Header text='Find contact'/>
        <Input name="name" handleChange={handleChange} value={search}/>
      </>
    )
  }

