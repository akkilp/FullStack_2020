import React, { useState} from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(Array(anecdotes.length).fill(0))


 const handleRandom = () => {
    let getNumber = () => {return Math.floor(Math.random() * anecdotes.length)}
    let randomNumber;
    // Loop for random number untill it differs to previous one
    do{
        randomNumber = getNumber()
    } while (randomNumber===selected);
    setSelected(randomNumber)
  }

const handleVote = () => {
    let copy = votes.slice();
    copy[selected] += 1;
    setVote(copy)
}

const getMostVoted = (arr) => {
    return arr.reduce((acc,val)=>{
        acc=(acc===undefined || val>acc ) ? val : acc
        return acc
    })
}

  return (
    <div>
      <Info anecdotes={anecdotes} selected={selected} votes={votes}/>
      <Button handleClick={handleRandom} text='Random'/>
      <Button handleClick={handleVote} text='Vote'/>
      <TopRated text={anecdotes[votes.indexOf(getMostVoted(votes))]}/>
    </div>
  )
}

const TopRated = ({text}) => {
    return(
        <>
            <h1>Anecdote with most votes</h1>
            <p>{text}</p>
        </>
    )
}

const Info = ({anecdotes, selected, votes}) => {
    return(
        <>
            <h1>Anecdote of the day</h1>
            <p>{anecdotes[selected]}</p>
            <p>Votes: {votes[selected]}</p>
        </>
    )
}

const Button = ({handleClick, text}) => <button onClick={() =>handleClick()}> {text}</button>


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)