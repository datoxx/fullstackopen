import React, { useState } from 'react'

function App() {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allScore, setAllScore] = useState(0)

  const goodScore = () => {
    setAllScore(allScore + 1)
    setGood(good + 1)
  }

  const neutralScore = () => {
    setAllScore(allScore + 1)
    setNeutral(neutral + 1)
  }

  const bedScore = () => {
    setAllScore(allScore + 1)
    setBad(bad + 1)
  }

  return (
    <div >
     <h1>give feedback</h1>

     <Button vote={goodScore} name={"good"} />
     <Button vote={neutralScore} name={"neutral"} />
     <Button vote={bedScore} name={"bad"} />

    <h2>statistics</h2>
    
    <Statistics 
      good={good} 
      neutral={neutral} 
      bad={bad} 
      allScore={allScore}
    />

    </div>
  );
}


const Statistics = ({good, neutral, bad, allScore}) => {
  if(allScore >= 1) {
    return(
      <div>
        <Score number={good} name={"good"}/>
        <Score number={neutral } name={"neutral"} />
        <Score number={bad} name={"bad"} />
        <Score number={allScore} name={"all"} />
        <Score number={(good - bad) / allScore} name={"average"} />
        <Score number={(good / allScore) * 100 + " %"} name={"positive"} />
      </div>
    );
  }

  return (
    <div>No feedback given</div>
  );

}

const Button = ({vote, name}) => {
  return (
    <button onClick={vote}>{name}</button>
  );
}

const Score = ({number, name}) => {
  return (
    <div>
      <table> 
        <tbody>
          <tr>
            <td>{name}</td>  
            <td>{number}</td> 
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;

