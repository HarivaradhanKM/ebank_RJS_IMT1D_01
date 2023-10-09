import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

import './App.css'

import Login from './Login'
import Home from './Home'
import NotFound from './NotFound'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/ebank/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <Route path="/" component={NotFound} />
    </Switch>
  </Router>
)

export default App
