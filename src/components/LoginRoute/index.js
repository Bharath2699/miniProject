import {Redirect, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {useState} from 'react'
import AccountContext from '../../ReactContext/AccountContext'
import './index.css'

const LoginRoute = props => {
  const [showErrorMsg, setMessage] = useState(false)

  const [errorMsg, setErrorMsg] = useState('')

  const token = Cookies.get('jwt_token')
  if (token !== undefined) {
    return <Redirect to="/" />
  }

  const renderFailureMessage = error => {
    setMessage(true)
    setErrorMsg(error)
  }

  return (
    <AccountContext.Consumer>
      {value => {
        const {
          activeUsername,
          activePassword,
          changeUsername,
          changePassword,
        } = value

        const onChangePassword = event => {
          changePassword(event.target.value)
        }

        const onChangeUsername = event => {
          changeUsername(event.target.value)
        }

        const renderSuccessMessage = jwtToken => {
          const {history} = props
          Cookies.set('jwt_token', jwtToken, {expires: 30})
          history.replace('/')
        }

        const onSubmitFormElement = async event => {
          event.preventDefault()
          const userDetails = {
            username: activeUsername,
            password: activePassword,
          }
          const url = 'https://apis.ccbp.in/login'
          const options = {
            method: 'POST',
            body: JSON.stringify(userDetails),
          }
          const response = await fetch(url, options)
          const data = await response.json()
          if (response.ok) {
            renderSuccessMessage(data.jwt_token)
          } else {
            renderFailureMessage(data.error_msg)
          }
        }

        return (
          <div className="login-container">
            <img
              src="https://res.cloudinary.com/ds6o1m3db/image/upload/v1697179647/Group_7399_o3bixe.svg"
              alt="login website logo"
              className="logo-image"
            />
            <form className="form" onSubmit={onSubmitFormElement}>
              <h1 className="heading">Login</h1>
              <div className="username-container">
                <label htmlFor="username" className="label">
                  USERNAME
                </label>
                <input
                  type="text"
                  className="input"
                  onChange={onChangeUsername}
                  id="username"
                  value={activeUsername}
                  placeholder="Enter the username"
                />
              </div>
              <div className="username-container">
                <label htmlFor="password" className="label">
                  PASSWORD
                </label>
                <input
                  type="password"
                  className="input"
                  onChange={onChangePassword}
                  id="password"
                  value={activePassword}
                  placeholder="Enter the password"
                />
              </div>
              {showErrorMsg && <p className="error-message">{errorMsg}</p>}

              <button type="submit" className="login-button">
                Login
              </button>
            </form>
          </div>
        )
      }}
    </AccountContext.Consumer>
  )
}
export default withRouter(LoginRoute)
