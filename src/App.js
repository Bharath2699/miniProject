import {Component} from 'react'

import {Route, Switch} from 'react-router-dom'
import HomeRoute from './components/HomeRoute'
import PopularRoute from './components/PopularRoute'
import MovieItemDetails from './components/MovieItemDetails'
import SearchRoute from './components/SearchRoute'
import ProtectedRoute from './components/ProtectedRoute'
import AccountRoute from './components/AccountRoute'
import LoginRoute from './components/LoginRoute'
import AccountContext from './ReactContext/AccountContext'
import NotFoundRoute from './components/NotFoundRoute'
import './App.css'

class App extends Component {
  state = {
    username: '',
    password: '',
  }

  changeUsername = value => {
    this.setState({username: value})
  }

  changePassword = value => {
    this.setState({password: value})
  }

  render() {
    const {username, password} = this.state
    return (
      <AccountContext.Provider
        value={{
          activeUsername: username,
          activePassword: password,
          changeUsername: this.changeUsername,
          changePassword: this.changePassword,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
          <ProtectedRoute exact path="/popular" component={PopularRoute} />
          <ProtectedRoute exact path="/search" component={SearchRoute} />
          <ProtectedRoute exact path="/account" component={AccountRoute} />
          <ProtectedRoute
            exact
            path="/movies/:id"
            component={MovieItemDetails}
          />
          <Route component={NotFoundRoute} />
        </Switch>
      </AccountContext.Provider>
    )
  }
}
export default App
