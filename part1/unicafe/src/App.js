import React, { useState } from 'react'

function App() {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div >
     <h1>give feedback</h1>
     <Button vote={() => setGood(good + 1)} name={"good"} />
     <Button vote={() => setNeutral(neutral + 1)} name={"neutral"} />
     <Button vote={() => setBad(bad + 1)} name={"bad"} />

    <h2>statistics</h2>
    <Score number={good} name={"good"}/>
    <Score number={neutral } name={"neutral"} />
    <Score number={bad} name={"bad"} />
    </div>
  );
}

const Button = ({vote, name}) => {
  return (
    <button onClick={vote}>{name}</button>
  );
}

const Score = ({number, name}) => {
  return (
    <div>{name} {number}</div>
  );
}






export default App;

