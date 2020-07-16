import { useState } from 'react'

export const useField = (id) => {
  const [value, setValue] = useState('')


  const onChange = (event) => {
    setValue(event.target.value)
  }
  
  const clear = () => {
      setValue('')
  }

  return {
    id,
    value,
    onChange,
    clear
  }
}

