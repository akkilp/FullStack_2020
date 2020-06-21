import React from 'react'

const Course = ({course}) => {
    return (
      <div>
          <Header name={course.name}/>
          <Content course={course}/>
          <Total exerciseArr={course.parts}/>
      </div>
    )
  }

  
const Header = ({name}) => <h1>{name}</h1>

const Content= ({course}) => {
    let mapParts = course.parts.map((part,i)=>{
        return <Part key={part.id} name={part.name} exercises={part.exercises} />
    })

    return (
        <>
            {mapParts}
        </>
    )
}

const Part = ({name, exercises}) => <p> {name} {exercises}</p>   

const Total = ({exerciseArr}) => {
    let calculateExercices = exerciseArr.reduce((acc, val) => {
        return acc += val.exercises
    },0)
    return (
        <p>Number of exercises {calculateExercices}</p>
    )
}

export default Course;


