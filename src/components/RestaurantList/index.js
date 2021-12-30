import {Component} from 'react'
import {GrRefresh} from 'react-icons/gr'
import {Button} from 'react-bootstrap'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaGreaterThan, FaLessThan} from 'react-icons/fa'
import Footer from '../Footer'
import Restaurants from '../Restaurants'
import RestaurantHeader from '../RestaurantHeader'
import './index.css'

const apiStatusConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

const sortbyOptions = [
  {
    optionId: 'Lowest',
    displayText: 'Lowest',
  },
  {
    optionId: 'Highest',
    displayText: 'Highest',
  },
]

const limit = 9

class RestaurantList extends Component {
  state = {
    apiStatus: apiStatusConstraints.initial,
    restaurantList: [],
    activePage: 1,
    activeOptionId: sortbyOptions[0].optionId,
  }

  componentDidMount() {
    this.getRestaurantList()
  }

  // API Call for Restaurants List
  getRestaurantList = async () => {
    this.setState({
      apiStatus: apiStatusConstraints.inProgress,
    })
    const {activePage, activeOptionId} = this.state
    const offset = (activePage - 1) * limit
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${activeOptionId}`,
      options,
    )
    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = data.restaurants.map(each => ({
        hasOnlineDelivery: each.has_online_delivery,
        userRating: each.user_rating,
        name: each.name,
        hasTableBooking: each.has_table_booking,
        isDeliveringNow: each.is_delivering_now,
        costForTwo: each.cost_for_two,
        cuisine: each.cuisine,
        imageUrl: each.image_url,
        id: each.id,
        menuType: each.menu_type,
        location: each.location,
        opensAt: each.opens_at,
        groupByTime: each.group_by_time,
      }))
      this.setState({
        restaurantList: fetchedData,
        apiStatus: apiStatusConstraints.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstraints.failure,
      })
    }
  }

  // Error Occurs Click On Refresh again send API Call
  refreshPage = () => {
    this.getRestaurantList()
  }

  // Filter by change over time state was changed
  updateActiveOptionId = activeOptionId => {
    this.setState({activeOptionId}, this.getRestaurantList)
  }

  // Pages to go back
  onDecrement = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage - 1,
        }),
        this.getRestaurantList,
      )
    } else {
      this.setState(
        {
          activePage: 1,
        },
        this.getRestaurantList,
      )
    }
  }

  // Pages to go Front
  onIncrement = () => {
    const {activePage} = this.state
    if (activePage > 20) {
      this.setState(
        {
          activePage: 1,
        },
        this.getRestaurantList,
      )
    } else {
      this.setState(
        prevState => ({
          activePage: prevState.activePage + 1,
        }),
        this.getRestaurantList,
      )
    }
  }

  // API Call Success View
  renderSuccessView = () => {
    const {restaurantList, activeOptionId, activePage} = this.state
    return (
      <div className="restaurants">
        <RestaurantHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          updateActiveOptionId={this.updateActiveOptionId}
        />
        <hr className="hr-line" />
        <ul className="restaurant-list">
          {restaurantList.map(each => (
            <Restaurants key={each.id} restaurantDetails={each} />
          ))}
        </ul>
        <div className="page-container">
          <button type="button" className="button" onClick={this.onDecrement}>
            <FaLessThan />
          </button>
          <div className="pages">{`${activePage} of 20`}</div>
          <button type="button" className="button" onClick={this.onIncrement}>
            <FaGreaterThan />
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  // API Call failure view
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

  // API Call Loading
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

export default RestaurantList
