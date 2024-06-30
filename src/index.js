import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import workoutsList from './Docs/workoutDocs.json'
import { Dashboard } from './Dashboard/dashboard'
import 'primereact/resources/themes/lara-light-cyan/theme.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.css'
import 'primeflex/primeflex.css' //icons
import 'primeflex/primeflex.css'
import 'bootstrap/dist/css/bootstrap.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
let workoutLsList = localStorage.getItem('workouts')
console.log(workoutLsList, '@@')
if (workoutLsList == null) {
  localStorage.setItem('workouts', JSON.stringify(workoutsList))
}
root.render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
