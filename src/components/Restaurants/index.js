import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const Restaurants = props => {
  const {restaurantDetails} = props
  const {name, userRating, menuType, imageUrl, id} = restaurantDetails
  const convertUserRating = {
    ratingText: userRating.rating_text,
    ratingColor: userRating.rating_color,
    totalReviews: userRating.total_reviews,
    rating: userRating.rating,
  }
  return (
    <Link to={`/restaurants/${id}`} className="list-container">
      <img src={imageUrl} alt="food" className="food-image" />
      <div className="restaurant-details-container">
        <h1 className="restaurant-name">{name}</h1>
        <p className="menu-type">{menuType}</p>
        <div className="rating-container">
          <AiFillStar className="star-icon" />
          <p className="rating">{convertUserRating.rating}</p>
          <p className="reviews">{`(${convertUserRating.totalReviews} ratings)`}</p>
        </div>
      </div>
    </Link>
  )
}

export default Restaurants
