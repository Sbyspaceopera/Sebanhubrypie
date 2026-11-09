import './MenuDrawer.css'
import { House, UserRound, X } from 'lucide-react'
import logo from '../assets/Logo.png'
import { Link } from 'react-router'

import { GAMES } from '../constants'

function MenuDrawer({ isOpen, onClose, onProfileClick }) {
  if (!isOpen) return null

  return (
    <div className="menu-overlay" onClick={onClose}>
      <aside
        className="menu-drawer"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="menu-top">
            <Link to="/">
              <div className="menu-brand">
                  <img src={logo} alt="Logo" /> 
                  <strong>Sebanhubrypie</strong>
              </div>
            </Link>

          <button
            className="menu-close"
            onClick={onClose}
            aria-label="Fermer le menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="menu-navigation">
          <Link to="/">
            <button className="menu-active" onClick={onClose}>
              <House size={18} />
              Accueil
            </button>
          </Link>
          
          <h3>JEUX</h3>

          {GAMES.map((game) => (
            <Link to={game.path}>
              <button key={game.id} onClick={onClose}>
                <span className="game-dot"></span>
                {game.nom}
              </button>
            </Link>
          ))}
        </nav>

        <div className="menu-bottom">
          <button onClick={onProfileClick}>
            <UserRound size={19} />
            Mon profil
          </button>
        </div>
      </aside>
    </div>
  )
}

export default MenuDrawer
