import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {format} from 'date-fns'
import MovieItem from '../MovieItem'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusOptions = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieItemDetails extends Component {
  state = {movieItemDetailsList: [], apiStatus: apiStatusOptions.initial}

  componentDidMount() {
    this.getMovieItemDetails()
  }

  getMovieItemDetails = async () => {
    this.setState({apiStatus: apiStatusOptions.inProgress})
    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        adult: data.movie_details.adult,
        backdropPath: data.movie_details.backdrop_path,
        budget: data.movie_details.budget,
        genres: data.movie_details.genres.map(each => ({
          id: each.id,
          name: each.name,
        })),
        id: data.movie_details.id,
        overview: data.movie_details.overview,
        posterPath: data.movie_details.poster_path,
        releaseDate: data.movie_details.release_date,
        runtime: data.movie_details.runtime,
        similarMovies: data.movie_details.similar_movies.map(each => ({
          id: each.id,
          backdropPath: each.backdrop_path,
          title: data.title,
          overview: each.overview,
          posterPath: each.poster_path,
        })),
        spokenLanguages: data.movie_details.spoken_languages.map(each => ({
          id: each.id,
          englishName: each.english_name,
        })),
        title: data.movie_details.title,
        voteAverage: data.movie_details.vote_average,
        voteCount: data.movie_details.vote_count,
      }
      this.setState({
        movieItemDetailsList: updatedData,
        apiStatus: apiStatusOptions.success,
      })
    } else {
      this.setState({apiStatus: apiStatusOptions.failure})
    }
  }

  renderSuccessView = () => {
    const {movieItemDetailsList} = this.state
    const {
      adult,
      budget,
      genres,
      backdropPath,
      overview,
      releaseDate,
      runtime,
      similarMovies,
      spokenLanguages,
      title,
      voteAverage,
      voteCount,
    } = movieItemDetailsList

    let certificate
    if (adult === false) {
      certificate = 'U/A'
    } else {
      certificate = 'A'
    }
    const hr = Math.floor(runtime / 60)
    const min = Math.ceil((runtime % 60) / 60)

    const releaseYear = format(new Date(releaseDate), 'do-MMM-yyyy')
    const date = new Date(releaseDate)
    const year = date.getFullYear()

    return (
      <div className="movieItem-container">
        <Header />
        <div
          className="movieItemDetailsTop-con"
          style={{backgroundImage: `url(${backdropPath})`}}
        >
          <div className="contents">
            <h1 className="movieItem-title">{title}</h1>
            <div className="rating-and-runtime">
              <p className="card">{`${hr}h ${min}m`}</p>
              <p className="card-c">{certificate}</p>
              <p className="card">{year}</p>
            </div>
            <p className="overview">{overview}</p>
            <button type="button" className="play-button">
              Play
            </button>
          </div>
        </div>

        <div className="other-details-con">
          <div className="movieItem-details-card">
            <h1 className="others-title">genres</h1>
            <div className="unorder-list">
              {genres.map(each => (
                <li className="movieslist-item" key={each.id}>
                  <p>{each.name}</p>
                </li>
              ))}
            </div>
          </div>
          <div className="movieItem-details-card">
            <h1 className="others-title">Audio Available</h1>
            <div className="unorder-list">
              {spokenLanguages.map(each => (
                <li className="movieslist-item" key={each.id}>
                  <p>{each.englishName}</p>
                </li>
              ))}
            </div>
          </div>
          <div className="movieItem-details-card">
            <h1 className="others-title">Rating Count</h1>
            <p className="others-content">{voteCount}</p>
            <h1 className="others-title">Rating Average</h1>
            <p className="others-content">{voteAverage}</p>
          </div>
          <div className="movieItem-details-card">
            <h1 className="others-title">Budget</h1>
            <p className="others-content">{budget}</p>
            <h1 className="others-title">Release Date</h1>
            <p className="others-content">{releaseYear}</p>
          </div>
        </div>
        <div className="similar-movies-container">
          <h1 className="more-like-this">More like this</h1>
          <ul className="similar-lists">
            {similarMovies.map(each => (
              <MovieItem movieDetails={each} key={each.id} />
            ))}
          </ul>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/ds6o1m3db/image/upload/v1697214403/Background-Complete_mbjg9a.svg"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-message">Something went wrong. Please try again</p>
      <button type="button" onClick={this.getMovieItemDetails}>
        Try Again
      </button>
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
    return <>{this.renderFinalMovies()}</>
  }
}
export default MovieItemDetails
