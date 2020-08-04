import React from "react";
import ReactDOM from "react-dom";

interface HeaderProps {
    courseName: string;
}

interface ContentArr {
    courseParts: Array<CoursePart>
}



interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

interface CourseWithDescription extends CoursePartBase{
    description?: string
}
  
  interface CoursePartOne extends CourseWithDescription{
    name: "Fundamentals";
  }
  
  interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
  }
  
  interface CoursePartThree extends CourseWithDescription {
    name: "Deeper type usage";
    exerciseSubmissionLink?: string;
  }

  interface CoursePartFour extends CourseWithDescription {
    name: "How to tie a know";
  }



  
  type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour
  

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const Header: React.FC<HeaderProps> = (props) => {
    return <h1>{props.courseName}</h1>
}

const Part: React.FC<CoursePart> = (props:any) => {

    return (
        <>
            <h4>{props.name}. Exercices: {props.exerciseCount} </h4>
            {props.exerciseSubmissionLink? <p>Submission link: {props.exerciseSubmissionLink} </p> : null }
            {props.description? <p>Description: {props.description} </p> : null }
            {props.groupProjectCount? <p>Group projects: {props.groupProjectCount} </p> : null }
        </>
    )
}

const Content: React.FC<ContentArr> = (props) => {
    
    let parts = props.courseParts.map(part => {
        switch(part.name){
            case "Deeper type usage":
                delete part.description;
                return <Part key={part.name} name={part.name} exerciseCount={part.exerciseCount}/>
            case "Using props to pass data":
                return <Part key={part.name} name={part.name} exerciseCount={part.exerciseCount} groupProjectCount={part.groupProjectCount}/>
            case "Fundamentals":
                return <Part key={part.name} name={part.name} exerciseCount={part.exerciseCount} description={part.description}/>
            case "How to tie a know":
                return <Part key={part.name} name={part.name} exerciseCount={part.exerciseCount} description={part.description}/>           
            default:
                return assertNever(part);
        }
    })

    return (
        <>
            {parts}
        </>
    )
}


const Total: React.FC<ContentArr> = (props) => {
    return (
        <>
        {<p>
            Number of exercises{" "}
            {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </p> }
        </>
    )
}

const App: React.FC = () => {
  const courseName: string = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    }
  ];

  return (
    <div>
      <Header courseName={courseName}/>
      <Content courseParts={courseParts}/>
      <Total courseParts={courseParts}/>
    </div>
  );
};



ReactDOM.render(<App />, document.getElementById("root"));

            {/* <p>
                {props.courseParts[0].name} {props.courseParts[0].exerciseCount}
            </p>
            <p>
                {props.courseParts[1].name} {props.courseParts[1].exerciseCount}
            </p>
            <p>
                {props.courseParts[2].name} {props.courseParts[2].exerciseCount}
            </p> */}