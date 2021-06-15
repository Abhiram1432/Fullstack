import React from 'react'

const App = () => {
  const course = 'Mearn Stack Web Development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 9
  const part2 = 'Using props to pass data'
  const exercises2 = 6
  const part3 = 'State of a component'
  const exercises3 = 7

  return (
    <div>
      <h1>{course}</h1>
      <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  )
}

export default App