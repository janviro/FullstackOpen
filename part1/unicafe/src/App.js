import { useState } from 'react'
import Statistics from './Statistics'
import Button from './Button'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGoodVote = () => setGood(good + 1);
  const addNeutralVote = () => setNeutral(neutral + 1);
  const addBadVote = () => setBad(bad + 1);

  return (
    <>
    <div>
      <h2>give feedback</h2>
      <Button text="good" onClick={() => addGoodVote()}/>
      <Button text="neutral" onClick={() => addNeutralVote()}/>
      <Button text="bad" onClick={() => addBadVote()}/>
    </div>
    <Statistics goodVotes={good} neutralVotes={neutral} badVotes={bad}/>
    </>
    
  )
}

export default App