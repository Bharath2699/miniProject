import {Link} from 'react-router-dom'
import {useState} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'
import {GiHamburgerMenu} from 'react-icons/gi'
import {GrFormClose} from 'react-icons/gr'
import './index.css'

const Header = () => {
  const [showHeader, setHeader] = useState(false)
  const onClickMenu = () => {
    setHeader(true)
  }

  const onClickClose = () => {
    setHeader(false)
  }

  return (
    <div className="bg-card">
      <nav className="header-lgContainer">
        <li className="item">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/ds6o1m3db/image/upload/v1697179647/Group_7399_o3bixe.svg"
              alt="website logo"
              className="header-logo"
            />
          </Link>
        </li>

        <div className="large-view">
          <div className="home-popular">
            <ul className="nav-item">
              <li className="item">
                <Link to="/" className="text">
                  Home
                </Link>
              </li>
              <li className="item">
                <Link to="/popular" className="text">
                  Popular
                </Link>
              </li>
            </ul>
          </div>
          <ul className="nav-item">
            <li className="search-c">
              <Link to="/search">
                <button
                  type="button"
                  testid="searchButton"
                  className="search-button"
                >
                  <HiOutlineSearch size={25} />
                </button>
              </Link>
            </li>
            <button type="button" className="menu-button" onClick={onClickMenu}>
              <GiHamburgerMenu size={24} />
            </button>
            <div className="account">
              <li className="item">
                <Link to="/account">
                  <img
                    src="https://res.cloudinary.com/ds6o1m3db/image/upload/v1697185867/Avatar_looon8.png"
                    alt="profile"
                    className="profile-image"
                  />
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </nav>
      {showHeader && (
        <div className="header-view">
          <ul className="mobile-header-view">
            <li className="item">
              <Link to="/" className="text">
                Home
              </Link>
            </li>
            <li className="item">
              <Link to="/popular" className="text">
                Popular
              </Link>
            </li>
            <li className="item">
              <Link to="/account" className="text">
                Account
              </Link>
            </li>
            <button
              type="button"
              className="close-button"
              onClick={onClickClose}
            >
              <GrFormClose size={18} />
            </button>
          </ul>
        </div>
      )}
    </div>
  )
}
export default Header
