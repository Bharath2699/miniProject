import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import MovieSlider from '../MovieSlider'
import './index.css'

const apiStatusOptions = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class HomeRoute extends Component {
  state = {
    trendingMovies: [],
    originalMovies: [],
    topRatedMovies: [],
    randomMovie: [],
    apiStatus: apiStatusOptions.initial,
  }

  componentDidMount() {
    this.getTrendingMoviesList()
    this.getOriginalMoviesList()
    this.getTopRatedMoviesList()
  }

  getTrendingMoviesList = async () => {
    this.setState({apiStatus: apiStatusOptions.inProgress})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        trendingMovies: updatedData,
        apiStatus: apiStatusOptions.success,
      })
    } else {
      this.setState({apiStatus: apiStatusOptions.failure})
    }
  }

  getOriginalMoviesList = async () => {
    this.setState({apiStatus: apiStatusOptions.inProgress})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/originals'
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
      const moviesLength = updatedData.length
      const getRandomMovieIndex = Math.floor(Math.random() * moviesLength)
      const getRandomMovie = updatedData[getRandomMovieIndex]
      this.setState({
        originalMovies: updatedData,
        randomMovie: getRandomMovie,
        apiStatus: apiStatusOptions.success,
      })
    } else if (response.status === 403) {
      this.setState({apiStatus: apiStatusOptions.failure})
    }
  }

  getTopRatedMoviesList = async () => {
    this.setState({apiStatus: apiStatusOptions.inProgress})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/top-rated-movies'
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
        topRatedMovies: updatedData,
        apiStatus: apiStatusOptions.success,
      })
    } else {
      this.setState({apiStatus: apiStatusOptions.failure})
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderTrendingMoviesFailureView = () => (
    <div className="trending-failure-container">
      <img
        src="https://res.cloudinary.com/ds6o1m3db/image/upload/v1697198154/alert-triangle_vdgqti.svg"
        alt="failure view"
        className="failure-image"
      />
      <p className="heading">Something went wrong. Please try again</p>
      <button type="button" onClick={this.getTrendingMoviesList}>
        Try Again
      </button>
    </div>
  )

  renderTopRatedMoviesFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/ds6o1m3db/image/upload/v1697198154/alert-triangle_vdgqti.svg"
        alt="failure view"
        className="failure-image"
      />
      <p className="heading">Something went wrong.Please try again</p>
      <button type="button" onClick={this.getTopRatedMoviesList}>
        Try Again
      </button>
    </div>
  )

  renderOriginalMoviesFailureView = () => (
    <div className="original-failure-container">
      <img
        src="https://res.cloudinary.com/ds6o1m3db/image/upload/v1697198154/alert-triangle_vdgqti.svg"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-heading">Something went wrong. Please try again</p>
      <button
        type="button"
        className="failure-button"
        onClick={this.getOriginalMoviesList}
      >
        Try Again
      </button>
    </div>
  )

  renderRandomMovieFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/ds6o1m3db/image/upload/v1697198154/alert-triangle_vdgqti.svg"
        alt="failure view"
        className="failure-image"
      />
      <p className="heading">Something went wrong.Please try again</p>
      <button type="button" onClick={this.getOriginalMoviesList}>
        Try Again
      </button>
    </div>
  )

  renderTrendingMoviesSuccessView = () => {
    const {trendingMovies} = this.state
    return (
      <div className="trending-Movie-container">
        <h1 className="home-movie-heading">Trending Now</h1>
        <MovieSlider moviesList={trendingMovies} />
      </div>
    )
  }

  renderTopRatedMoviesSuccessView = () => {
    const {topRatedMovies} = this.state
    return (
      <div className="top-Movie-container">
        <h1 className="home-movie-heading">Top Rated Movies</h1>
        <MovieSlider moviesList={topRatedMovies} />
      </div>
    )
  }

  renderOriginalMoviesSuccessView = () => {
    const {originalMovies} = this.state
    return (
      <div className="original-Movie-container">
        <h1 className="home-movie-heading">Originals</h1>
        <MovieSlider moviesList={originalMovies} />
      </div>
    )
  }

  renderRandomMovieSuccessView = () => {
    const {randomMovie} = this.state
    const {title, overview, backdropPath} = randomMovie
    return (
      <div
        className="home-top-container"
        style={{
          backgroundImage: `url(${backdropPath})`,
          backgroundSize: 'cover',
        }}
      >
        <div className="home-top-contents">
          <h1 className="movie-title">{title}</h1>
          <p className="overview">{overview}</p>
          <button type="button" className="play-button">
            Play
          </button>
        </div>
      </div>
    )
  }

  renderTrendingFinalMovies = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusOptions.success:
        return this.renderTrendingMoviesSuccessView()
      case apiStatusOptions.failure:
        return this.renderTrendingMoviesFailureView()
      case apiStatusOptions.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  renderTopRatedFinalMovies = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusOptions.success:
        return this.renderTopRatedMoviesSuccessView()
      case apiStatusOptions.failure:
        return this.renderTopRatedMoviesFailureView()
      case apiStatusOptions.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  renderOriginalFinalMovies = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusOptions.success:
        return this.renderOriginalMoviesSuccessView()
      case apiStatusOptions.failure:
        return this.renderOriginalMoviesFailureView()
      case apiStatusOptions.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  renderRandomMovieFinalMovies = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusOptions.success:
        return this.renderRandomMovieSuccessView()
      case apiStatusOptions.failure:
        return this.renderOriginalMoviesFailureView()
      case apiStatusOptions.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-container">
        <Header />

        <div className="home-top-card">
          {this.renderRandomMovieFinalMovies()}
        </div>
        <div className="home-bottom-card">
          {this.renderTrendingFinalMovies()}
          {this.renderTopRatedFinalMovies()}
          {this.renderOriginalFinalMovies()}
        </div>
        <Footer />
      </div>
    )
  }
}
export default HomeRoute
