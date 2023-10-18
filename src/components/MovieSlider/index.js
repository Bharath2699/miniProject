import Slider from 'react-slick'
import MovieItem from '../MovieItem'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const MovieSlider = props => {
  const {moviesList} = props
  const settings = {
    dots: false,
    slidesToScroll: 1,
    slidesToShow: 4,
  }
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {moviesList.map(each => (
          <MovieItem key={each.id} movieDetails={each} />
        ))}
      </Slider>
    </div>
  )
}
export default MovieSlider
