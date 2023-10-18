import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <ul className="logo-list">
      <li className="icon">
        <FaGoogle size={18} fill="#ffffff" />
      </li>
      <li className="icon">
        <FaTwitter size={18} fill="#ffffff" />
      </li>
      <li className="icon">
        <FaInstagram size={18} fill="#ffffff" />
      </li>
      <li className="icon">
        <FaYoutube size={18} fill="#ffffff" />
      </li>
    </ul>
    <p className="tag">Contact Us</p>
  </div>
)
export default Footer
