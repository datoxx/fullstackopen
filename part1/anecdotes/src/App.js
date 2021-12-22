import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    "No matter what the problem is, it's always a people problem.",
    'Adding manpower to a late software project makes it later!',
    "When debugging, novices insert corrective code; experts remove defective code.",
    "Simplicity is prerequisite for reliability",
    "If something is worth doing once, it's worth building a tool to do it.",
    "Prolific programmers contribute to certain disaster.",
    "Every good work of software starts by scratching a developer's personal itch",
    "Plan to throw one (implementation) away; you will, anyhow.",
    "Better train people and risk they leave - than do nothing and risk they stay.",
    "Programming can be fun, so can cryptography; however they should not be combined.",
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)

  let randomIndex = Math.floor(Math.random() * anecdotes.length);

  const nexAnecdote = () => {
    setSelected(randomIndex)
  }

  return (
    <div>
      <h1>{anecdotes[selected]}</h1>
      <Button click={nexAnecdote} name={"next anecdote"} />
    </div>
  );
}

const Button = ({click, name}) => {
  return (
    <button onClick={click}>{name}</button>
  );
}

export default App