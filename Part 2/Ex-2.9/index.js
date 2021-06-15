import ReactDOM from 'react-dom'
import App from './App.js'

const persons = [
  {
    id: 1,
    name: 'KT',
    number: 7032172001
  },
  {
    id: 2,
    name: 'Abhiram',
    number: 9100226132
  },
  {
    id: 3,
    name: 'Nitesh',
    number: 9290552800
  }
]

ReactDOM.render(
  <App persons={persons} />,
  document.getElementById('root')
)