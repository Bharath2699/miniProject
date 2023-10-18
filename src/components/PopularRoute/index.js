import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import MovieItem from '../MovieItem'
import './index.css'

const apiStatusOptions = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class PopularRoute extends Component {
  state = {popularMovies: [], apiStatus: apiStatusOptions.initial}

  componentDidMount() {
    this.getPopularMoviesList()
  }

  getPopularMoviesList = async () => {
    this.setState({apiStatus: apiStatusOptions.inProgress})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
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
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        popularMovies: updatedData,
        apiStatus: apiStatusOptions.success,
      })
    } else {
      this.setState({apiStatus: apiStatusOptions.failure})
    }
  }

  renderPopularMoviesSuccessView = () => {
    const {popularMovies} = this.state
    return (
      <ul className="popularMovies-list">
        {popularMovies.map(each => (
          <MovieItem movieDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/ds6o1m3db/image/upload/v1697214403/Background-Complete_mbjg9a.svg"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-message">Something went wrong. Please try again</p>
      <button type="button" onClick={this.getPopularMoviesList}>
        Try Again
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFinalMovies = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusOptions.success:
        return this.renderPopularMoviesSuccessView()
      case apiStatusOptions.failure:
        return this.renderFailureView()
      case apiStatusOptions.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-container">
        <Header />
        {this.renderFinalMovies()}
        <Footer />
      </div>
    )
  }
}

export default PopularRoute
