import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import AccountContext from '../../ReactContext/AccountContext'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const AccountRoute = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <AccountContext.Consumer>
      {value => {
        const {activeUsername} = value
        return (
          <div className="account-container">
            <div className="header-card">
              <Header />
            </div>
            <div className="details-card">
              <div className="details-container">
                <h1 className="account-heading">Account</h1>
                <hr className="line" />
                <div className="account-details">
                  <p className="membership">Member ship</p>
                  <div className="mail-password">
                    <p className="mail">{activeUsername}</p>
                    <p className="mail">Password : ************</p>
                  </div>
                </div>
                <hr className="line" />
                <div className="plans">
                  <p className="membership">Plan details </p>
                  <div className="plan-details">
                    <p className="premium">Premium</p>
                    <p className="hd">Ultra HD</p>
                  </div>
                </div>
                <hr className="line" />

                <button
                  type="button"
                  onClick={onClickLogout}
                  className="logout-button"
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="footer-account-card">
              <Footer />
            </div>
          </div>
        )
      }}
    </AccountContext.Consumer>
  )
}
export default withRouter(AccountRoute)
