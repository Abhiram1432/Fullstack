import ReactDOM from 'react-dom'
import App from './App.js'

const persons = [
  {
    id: 1,
    name: 'KT'
  },
  {
    id: 2,
    name: 'Abhiram'
  },
  {
    id: 3,
    name: 'Nitesh'
  }
]

ReactDOM.render(
  <App persons={persons} />,
  document.getElementById('root')
)