import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState()
  const [neutral, setNeutral] = useState()
  const [bad, setBad] = useState()

  return (
    <div>
        <h1>give feedback</h1>
      {good}
      <button onClick={() => setGood(good)}>
        good
      </button>
      <button onClick={() => setNeutral(neutral)}>
        neutral
      </button>
      {neutral}
      <button onClick={() => setBad(bad)}>
        bad
      </button>
      {bad}
      <h2>statistics</h2>
      <p>good</p>

      <p>neutral</p>

      <p>bad</p>

      <p>all</p>

      <p>average</p>

      <p>positive</p>
      
    </div>
  )
}

export default App