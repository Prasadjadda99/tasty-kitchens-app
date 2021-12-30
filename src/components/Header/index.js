import {Component} from 'react'
import {withRouter, Redirect, Link} from 'react-router-dom'
import {HiOutlineMenu} from 'react-icons/hi'
import {GiCrossMark} from 'react-icons/gi'
import Cookies from 'js-cookie'
import {Button} from 'react-bootstrap'
import './index.css'

class Header extends Component {
  state = {
    isClicked: false,
  }

  logout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  navMenu = () => {
    this.setState({
      isClicked: true,
    })
  }

  removeNav = () => {
    this.setState({
      isClicked: false,
    })
  }

  renderHeaderList = () => (
    <div className="nav-header">
      <div>
        <Link to="/" className="nav-link-mobile">
          Home
        </Link>
        <Link to="/cart" className="nav-link-mobile cart">
          Cart
        </Link>
        <Button
          type="button"
          className="logout-button-mobile"
          onClick={this.logout}
        >
          Logout
        </Button>
      </div>
      <button type="button" className="mark-button" onClick={this.removeNav}>
        <GiCrossMark className="mark-icon" />
      </button>
    </div>
  )

  renderView = () => {
    const {isClicked} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return (
        <>
          <div className="header-container">
            <div className="logo-container">
              <img
                src="https://res.cloudinary.com/dfy3le1fz/image/upload/v1640316388/Frame_274_edkjtn.png"
                alt="logo"
                className="logo"
              />
              <h1 className="company-title">Tasty Kitchens</h1>
            </div>
            <div className="desktop">
              <Link to="/" className="nav-link-mobile home">
                Home
              </Link>
              <Link to="/cart" className="nav-link-mobile cart">
                Cart
              </Link>
              <Button
                type="button"
                className="logout-button-mobile"
                onClick={this.logout}
              >
                Logout
              </Button>
            </div>
            <div className="mobile-nav-icon">
              {!isClicked && (
                <button type="button" className="button" onClick={this.navMenu}>
                  <HiOutlineMenu className="nav-icon" />
                </button>
              )}
            </div>
          </div>
          <div className="mobile-nav">
            {isClicked && this.renderHeaderList()}
          </div>
        </>
      )
    }
    return <Redirect to="/login" />
  }

  render() {
    return <>{this.renderView()}</>
  }
}

export default withRouter(Header)
