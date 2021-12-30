import {Component} from 'react'
import {GrRefresh} from 'react-icons/gr'
import {AiFillStar} from 'react-icons/ai'
import {Button} from 'react-bootstrap'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import FoodItemCard from '../FoodItemCard'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class SpecificRestaurantDetails extends Component {
  state = {
    apiStatus: apiStatusConstraints.initial,
    foodItemsList: [],
    specificRestaurant: {},
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  // API Call to Server
  getRestaurantDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    this.setState({
      apiStatus: apiStatusConstraints.inProgress,
    })

    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = {
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        foodItems: data.food_items,
        id: data.id,
        imageUrl: data.image_url,
        itemsCount: data.items_count,
        location: data.location,
        name: data.name,
        opensAt: data.opens_at,
        rating: data.rating,
        reviewsCount: data.reviews_count,
      }

      const {foodItems} = fetchedData

      const foodItem = foodItems.map(each => ({
        name: each.name,
        cost: each.cost,
        id: each.id,
        foodType: each.food_type,
        imageUrl: each.image_url,
      }))

      this.setState({
        foodItemsList: foodItem,
        apiStatus: apiStatusConstraints.success,
        specificRestaurant: fetchedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstraints.failure,
      })
    }
  }

  // API Call success view
  renderSuccessView = () => {
    const {foodItemsList, specificRestaurant} = this.state
    const {
      name,
      imageUrl,
      cuisine,
      location,
      rating,
      costForTwo,
      reviewsCount,
    } = specificRestaurant

    return (
      <div>
        <Header />
        <div className="">
          <div>
            <img src={imageUrl} />
            <div>
              <div>
                <h1>{name}</h1>
                <p>{cuisine}</p>
                <p>{location}</p>
                <div>
                  <div>
                    <div>
                      <AiFillStar />
                      <h1>{rating}</h1>
                    </div>
                    <p>{`${reviewsCount}+ Ratings`}</p>
                  </div>
                  <div>
                    <p>{`Rs ${costForTwo}`}</p>
                    <p>Cost for two</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ul>
            {foodItemsList.map(each => (
              <FoodItemCard key={each.id} foodDetails={each} />
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    )
  }

  // API Call Failure
  renderFailureView = () => (
    <div>
      <img
        src="https://res.cloudinary.com/dfy3le1fz/image/upload/v1640773279/Layer_2_ek1ljj.jpg"
        alt="not found"
      />
      <h2>Page Not Found</h2>
      <p>We are sorry, the page you requested could not be found.</p>
      <p>Please Refresh the homepage</p>
      <Button onClick={this.refreshPage}>
        <GrRefresh />
      </Button>
    </div>
  )

  // API Call in progress
  renderLoadingView = () => (
    <div className="loader-container">
      <div>
        <Loader type="Circles" color="#0b69ff" height="50" width="50" />
      </div>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstraints.success:
        return this.renderSuccessView()
      case apiStatusConstraints.failure:
        return this.renderFailureView()
      case apiStatusConstraints.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default SpecificRestaurantDetails
