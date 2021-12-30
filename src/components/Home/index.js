import RestaurantList from '../RestaurantList'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <RestaurantList />
    </div>
  </>
)

export default Home
