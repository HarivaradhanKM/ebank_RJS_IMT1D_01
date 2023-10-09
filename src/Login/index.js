// import {useState} from 'react'
// import Cookies from 'js-cookie'
// import './index.css'

// const Login = ({onLogin}) => {
//   const [userId, setUserId] = useState('')
//   const [pin, setPin] = useState('')
//   const [error, setError] = useState('')

//   const handleLogin = async e => {
//     e.preventDefault()

//     if (!userId.trim() || !pin.trim()) {
//       setError('Please provide both User ID and PIN.')
//       return
//     }

//     const response = await fetch('https://apis.ccbp.in/ebank/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         user_id: parseInt(userId),
//         pin: parseInt(pin),
//       }),
//     })

//     const data = await response.json()

//     if (response.ok) {
//       onLogin()
//     } else {
//       setError(data.error_msg)
//     }
//   }

//   return (
//     <div className="bg-container">
//       <div className="login-card">
//         <div className="image-container">
//           <img
//             className="login-page-image"
//             alt="website login"
//             src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
//           />
//         </div>
//         <div className="login-container">
//           <h1 className="login-heading">Welcome Back!</h1>
//           <form onSubmit={handleLogin}>
//             <div className="form-group">
//               <label htmlFor="text"> User ID </label>
//               <input
//                 type="text"
//                 id="text"
//                 value={userId}
//                 onChange={e => setUserId(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="password">PIN</label>
//               <input
//                 type="password"
//                 id="password"
//                 value={pin}
//                 onChange={e => setPin(e.target.value)}
//                 required
//               />
//             </div>
//             <button type="submit">Login</button>
//             {error && <p className="error-message">{error}</p>}
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login

import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    userId: '',
    pin: '',
    error: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  handleLogin = async e => {
    const {userId, pin} = this.state
    e.preventDefault()

    if (!userId.trim() && !pin.trim()) {
      this.setState({
        error: 'Invalid User Id.',
      })
    } else if (!pin.trim()) {
      this.setState({
        error: 'Invalid PIN.',
      })
    }

    const userDetails = {
      user_id: userId,
      pin,
    }

    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      //   this.props.onLogin()
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({
        error: data.error_msg,
      })
    }
  }

  render() {
    const {userId, pin, error} = this.state
    if (Cookies.get('jwt_token')) {
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
          <div className="login-container">
            <h1 className="login-heading">Welcome Back!</h1>
            <form onSubmit={this.handleLogin}>
              <div className="form-group">
                <label htmlFor="text"> User ID </label>
                <input
                  type="text"
                  id="text"
                  value={userId}
                  onChange={e => this.setState({userId: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">PIN</label>
                <input
                  type="password"
                  id="password"
                  value={pin}
                  onChange={e => this.setState({pin: e.target.value})}
                />
              </div>
              <button type="submit">Login</button>
              {error && <p className="error-message">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
