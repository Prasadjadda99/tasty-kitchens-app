import {SiPinterest, SiInstagram, SiTwitter, SiFacebook} from 'react-icons/si'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-header-container">
        <img
          src="https://res.cloudinary.com/dfy3le1fz/image/upload/v1640316388/Frame_274_edkjtn.png"
          alt="logo"
          className="logo"
        />
        <h1 className="heading">Tasty Kitchens</h1>
      </div>
      <p className="description contact-us">
        The only thing we are serious about is food.
      </p>
      <p className="description contact">Contact us on</p>
      <div className="icons-container">
        <SiPinterest className="icon" />
        <SiInstagram className="icon" />
        <SiTwitter className="icon" />
        <SiFacebook className="icon" />
      </div>
    </div>
  )
}
