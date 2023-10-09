import {useState} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import './App.css'

import Login from './Login'
import Home from './Home'
import NotFound from './NotFound'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? (
            <Home onLogout={handleLogout} />
          ) : (
            <Redirect to="/ebank/login" />
          )}
        </Route>
        <Route path="/ebank/login">
          {isLoggedIn ? <Redirect to="/" /> : <Login onLogin={handleLogin} />}
        </Route>
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  )
}

export default App
