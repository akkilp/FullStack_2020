import ReactDOM from 'react-dom'
import React from 'react'

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Content= (props) => {
    return (
        <>
            <Part content={props.content[0]}/>
            <Part content={props.content[1]}/>
            <Part content={props.content[2]}/>
        </>
    )
}

const Part = (props) => {
    console.log(props, "tää")
    const {name,exercises} = props.content;
    return (
        <p>
            {name} {exercises}
        </p>
    )
}


const Total = (props) => {
    return (
        <p>Number of exercises {props.content[0].exercises +props.content[1].exercises +props.content[2].exercises}</p>
    )
}



const App = () => {
    const course = {
        name:'Half Stack application development',
        content : [
            {name:'Fundamentals of React' ,exercises:10 },
            {name:'Using props to pass data',exercises:17  },
            {name: 'State of a component',exercises:14 }
        ]
    }

  return (
    <div>
        <Header course={course.name}/>
        <Content content={course.content}/>
        <Total content={course.content}/>
    </div>

  )
}

ReactDOM.render(<App />, document.getElementById('root'))