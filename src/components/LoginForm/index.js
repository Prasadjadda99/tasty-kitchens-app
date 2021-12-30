import {Component} from 'react'
import {Button} from 'react-bootstrap'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    isErrorMsg: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok === true) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({
        isErrorMsg: true,
        errorMsg: data.error_msg,
      })
    }
  }

  render() {
    const {username, password, isErrorMsg, errorMsg} = this.state
    return (
      <div className="login-page-main-container">
        <div className="login-page-container">
          <div className="login-page-details-container">
            <img
              src="https://res.cloudinary.com/dfy3le1fz/image/upload/v1640316388/Frame_274_edkjtn.png"
              alt="logo"
              className="company-logo"
            />
            <h1 className="company-title">Tasty Kitchens</h1>
            <p className="login-text-desktop">Login</p>
            <form className="form-container" onSubmit={this.onSubmitLoginForm}>
              <div className="label-container">
                <label htmlFor="username" className="label-element">
                  USERNAME
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  className="input-element"
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="label-container">
                <label htmlFor="password" className="label-element">
                  PASSWORD
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  className="input-element"
                  onChange={this.onChangePassword}
                />
              </div>
              <Button type="submit" className="login-button">
                Login
              </Button>
              {isErrorMsg && <p className="error-message">*{errorMsg}</p>}
            </form>
          </div>
        </div>
        <img
          src="https://res.cloudinary.com/dfy3le1fz/image/upload/v1639374507/Rectangle_1456_c48u1p.jpg"
          alt="food"
          className="desktop-food-image"
        />
      </div>
    )
  }
}

export default LoginForm
