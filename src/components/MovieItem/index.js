import {Link} from 'react-router-dom'
import './index.css'

const MovieItem = props => {
  const {movieDetails} = props
  const {posterPath, title, id} = movieDetails
  return (
    <Link to={`/movies/${id}`} className="movie-link">
      <li className="img-list">
        <img src={posterPath} alt={title} className="image" />
      </li>
    </Link>
  )
}
export default MovieItem
