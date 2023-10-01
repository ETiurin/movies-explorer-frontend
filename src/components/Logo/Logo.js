import { Link } from 'react-router-dom';

import './Logo.css';
import logoImage from '../../images/logo.svg';

function Logo() {
  return (
    <Link className="hover-opacity-btn" to="/">
      <img className="logo-image" src={logoImage} alt="Логотип Movies Explorer" />
    </Link>
  )
}

export default Logo;