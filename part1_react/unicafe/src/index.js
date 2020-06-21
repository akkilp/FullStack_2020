import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics= ({good, bad, neutral, history}) =>{

    let all = history.length;
    let positive = ((good/all)*100).toFixed(1)+"%";
    console.log(history.map(item=>{
        console.log(item)
        if(item==="G") return 1
        if(item==="B") return -1
        if(item==="N") return 0
    }))

    let getAverage = (arr) => {
        let numberArr = arr.map(item=>{
            console.log(item)
            if(item==="G") return 1
            if(item==="B") return -1
            if(item==="N") return 0
        })
        let calculateNumbers = numberArr.reduce((total,acc)=> {
            return total +=acc;
        },0)
        return (calculateNumbers/arr.length).toFixed(1)
    }

    if(all>0){
        return (
            <>
                <Header text='statistics'/> 
                <table>
                    <tbody>
                        <InfoBar text='good' number={good}/>
                        <InfoBar text='neutral' number={neutral}/>
                        <InfoBar text='bad' number={bad}/>
                        <InfoBar text='all' number={all}/>
                        <InfoBar text='positive' number={getAverage(history)}/>
                        <InfoBar text='positive' number={positive}/>
                    </tbody>
                </table>
            </>
        )
    } else return <Header text='no statistics'/>

}

const FeedBack = ({handleClickBad, handleClickGood, handleClickNeutral}) =>{
    return(
        <div>
            <Header text='give feedback'/>
            <Button text='good' handleClick={handleClickGood}/>
            <Button text='neutral' handleClick={handleClickNeutral}/>
            <Button text='bad' handleClick={handleClickBad}/>
        </div>
    )
}

const InfoBar = ({text, number}) => {
    return(
            <tr>
                <td>{text}</td>
                <td>{number}</td>
            </tr>
    )
}

const Header = ({text}) => <h1>{text}</h1>

const Button = ({handleClick, text}) => <button onClick={handleClick}> {text}</button>

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [history, setHistory] = useState([])

const handleClickGood = () => {
    setGood(good+1)
    setHistory(history.concat('G'))
}

const handleClickNeutral = () => {
    setNeutral(neutral+1)
    setHistory(history.concat('N'))
}

const handleClickBad = () => {
    setBad(bad+1)
    setHistory(history.concat('B'))
}

  return (
    <div>
      <FeedBack handleClickBad={handleClickBad} handleClickGood={handleClickGood} handleClickNeutral={handleClickNeutral}/>
      <Statistics good={good} bad={bad} neutral={neutral} history={history}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

