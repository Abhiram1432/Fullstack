const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

 
  const e= [10, 7, 14]
  const n=['Fundamentals of React','Using props to pass data',' State of a component']

n.push(9)

//console.log(n.length) 
//console.log(n[1])     

n.forEach(value => {
  console.log(value)  
})