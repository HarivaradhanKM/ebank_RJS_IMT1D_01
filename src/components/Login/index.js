import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    userId: '',
    pin: '',
    se: false,
    errorMsg: '',
  }

  userId = event => {
    this.setState({
      userId: event.target.value,
    })
  }

  pin = event => {
    this.setState({
      pin: event.target.value,
    })
  }

  loginSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  loginFailed = errorMsg => {
    this.setState({
      se: true,
      errorMsg,
    })
  }

  BankLogin = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.loginSuccess(data.jwt_token)
    } else {
      this.loginFailed(data.error_msg)
    }
  }

  render() {
    const {userId, pin, se, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg-container">
        <div className="login-card">
          <div className="image-container">
            <img
              className="login-page-image"
              alt="website login"
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            />
          </div>
          <form className="login-container" onSubmit={this.BankLogin}>
            <h1 className="login-heading">Welcome Back!</h1>
            <div className="form-group">
              <label htmlFor="text"> User ID </label>
              <input
                type="text"
                id="text"
                placeholder="Enter User ID"
                value={userId}
                onChange={this.userId}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">PIN</label>
              <input
                type="password"
                id="password"
                placeholder="Enter Pin"
                value={pin}
                onChange={this.pin}
              />
            </div>
            <button type="submit">Login</button>
            {se === true && <p className="error-message">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
