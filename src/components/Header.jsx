import './Header.css'
import logo from '../assets/Logo.png'
import icone from '../assets/icone.png'

import { Link } from 'react-router'

function Header({ onMenuClick, onProfileClick }) {
  return (
    <header>
      <button
        className="menu-button"
        aria-label="Ouvrir le menu"
        onClick={onMenuClick}
      >
        ☰
      </button>

      <Link className='header-logo-link' to="/">
        <img
          className="header-logo"
          src={logo}
          alt="Logo Sebanhubrypie"
        />
      </Link>

      <button
        className="profile-button"
        onClick={onProfileClick}
        aria-label="Mon profil"
      >
        <img src={icone} alt="" />
      </button>
    </header>
  )
}

export default Header