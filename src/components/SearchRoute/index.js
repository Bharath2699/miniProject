import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {HiOutlineSearch} from 'react-icons/hi'
import {Link} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {GrFormClose} from 'react-icons/gr'
import MovieItem from '../MovieItem'
import './index.css'

const apiStatusOptions = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SearchRoute extends Component {
  state = {
    searchResults: [],
    searchInput: '',
    showHeader: false,
    apiStatus: apiStatusOptions.initial,
  }

  componentDidMount() {
    this.getSearchResultList()
  }

  getSearchResultList = async () => {
    this.setState({apiStatus: apiStatusOptions.inProgress})
    const {searchInput} = this.state
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.results.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        title: data.title,
        overview: each.overview,
        posterPath: each.poster_path,
      }))
      this.setState({
        searchResults: updatedData,
        apiStatus: apiStatusOptions.success,
      })
    } else {
      this.setState({apiStatus: apiStatusOptions.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickKeydown = event => {
    if (event.key === 'Enter') {
      this.getSearchResultList()
    }
  }

  onClickSearchIcon = () => {
    this.getSearchResultList()
  }

  onClickMenu = () => {
    this.setState({showHeader: true})
  }

  onClickClose = () => {
    this.setState({showHeader: false})
  }

  renderFailureView = () => {
    const {searchInput} = this.state
    return (
      <div className="failure-container">
        <img
          src="https://res.cloudinary.com/ds6o1m3db/image/upload/v1697262659/Layer_2_wwdmn4.svg"
          alt="no movies"
          className="failure-image"
        />
        <p className="failure-content">
          `Your search for 4{searchInput} did not find any matches.`
        </p>
      </div>
    )
  }

  renderSuccessView = () => {
    const {searchResults} = this.state
    if (searchResults.length === 0) {
      this.renderFailureView()
    }
    console.log(searchResults)
    return (
      <ul className="search-results">
        {searchResults.map(each => (
          <MovieItem movieDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFinalMovies = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusOptions.success:
        return this.renderSuccessView()
      case apiStatusOptions.failure:
        return this.renderFailureView()
      case apiStatusOptions.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    const {searchInput, showHeader} = this.state
    return (
      <div className="search-container">
        <div className="search-header-card">
          <div className="bg-card">
            <nav className="header-lgContainer">
              <li className="item">
                <Link to="/">
                  <img
                    src="https://res.cloudinary.com/ds6o1m3db/image/upload/v1697179647/Group_7399_o3bixe.svg"
                    alt="website logo"
                    className="header-logo"
                  />
                </Link>
              </li>

              <div className="large-view">
                <div className="home-popular">
                  <ul className="nav-item">
                    <li className="item">
                      <Link to="/" className="text">
                        Home
                      </Link>
                    </li>
                    <li className="item">
                      <Link to="/popular" className="text">
                        Popular
                      </Link>
                    </li>
                  </ul>
                </div>
                <ul className="nav-item">
                  <li className="search-con">
                    <div className="search-card-item">
                      <input
                        type="search"
                        className="large-input"
                        onChange={this.onChangeSearchInput}
                        onKeyDown={this.onClickKeydown}
                        value={searchInput}
                      />
                      <button
                        type="button"
                        className="search-button"
                        onClick={this.onClickSearchIcon}
                        testid="searchButton"
                      >
                        <HiOutlineSearch size={25} />
                      </button>
                    </div>
                  </li>
                  <button
                    type="button"
                    className="menu-button"
                    onClick={this.onClickMenu}
                  >
                    <GiHamburgerMenu size={24} />
                  </button>
                  <div className="account">
                    <li className="item">
                      <Link to="/account">
                        <img
                          src="https://res.cloudinary.com/ds6o1m3db/image/upload/v1697185867/Avatar_looon8.png"
                          alt="profile"
                          className="profile-image"
                        />
                      </Link>
                    </li>
                  </div>
                </ul>
              </div>
            </nav>
            {showHeader && (
              <div className="header-view">
                <ul className="mobile-header-view">
                  <li className="item">
                    <Link to="/" className="text">
                      Home
                    </Link>
                  </li>
                  <li className="item">
                    <Link to="/popular" className="text">
                      Popular
                    </Link>
                  </li>
                  <li className="item">
                    <Link to="/account" className="text">
                      Account
                    </Link>
                  </li>
                  <button
                    type="button"
                    className="close-button"
                    onClick={this.onClickClose}
                  >
                    <GrFormClose size={18} />
                  </button>
                </ul>
              </div>
            )}
          </div>
        </div>
        {this.renderFinalMovies()}
      </div>
    )
  }
}
export default SearchRoute
