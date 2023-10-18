import {Link} from 'react-router-dom'
import './index.css'

const NotFoundRoute = () => (
  <div className="notfound-container">
    <img
      src="https://res.cloudinary.com/ds6o1m3db/image/upload/v1697267155/4c28572ced55c420bbcd234b14c68813_bpiuoo.jpg"
      alt="not found"
      className="not-found-image"
    />
    <h1 className="failure-heading">Lost Your Way?</h1>
    <p className="failure-message">
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button" className="home-button">
        Go to Home
      </button>
    </Link>
  </div>
)
export default NotFoundRoute
