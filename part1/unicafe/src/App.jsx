import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}> {props.text} </button>
)

const Feedback = ({handleGoodClick, handleNeutralClick, handleBadClick}) => (
  <>
    <h1>give feedback</h1>
    <Button onClick={handleGoodClick} text="good" />
    <Button onClick={handleNeutralClick} text="neutral" />
    <Button onClick={handleBadClick} text="bad" />
  </>
)

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = ( good * 1 + bad * (-1) ) / all
  const positive = ( good / all ) * 100
  return (
    <>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>{positive} %</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <Feedback handleGoodClick={handleGoodClick} handleNeutralClick={handleNeutralClick} handleBadClick={handleBadClick}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
