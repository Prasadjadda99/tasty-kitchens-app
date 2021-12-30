import {Route, Switch} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import SpecificRestaurantDetails from './components/SpecificRestaurantDetails'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <Route exact path="/" component={Home} />
    <Route
      exact
      path="/restaurants/:id"
      component={SpecificRestaurantDetails}
    />
  </Switch>
)

export default App
