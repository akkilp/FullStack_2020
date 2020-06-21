import React from 'react'

export const Header = ({text}) => <h1>{text}</h1>

export const PersonCard = ({name, number, children}) => <p>{name} {number} {children}</p>

export const Button = ({text, handleClick, id}) => {
    return(
        <>
            <button onClick={handleClick}>{text} {id}</button>
        </>
    )
}

export const Input = ({handleChange, name, value}) => {
    return(
      <div>
        {name}
        <input
        onChange={handleChange}
        name={name}
        value={value}
        />
      </div>
    )
}
