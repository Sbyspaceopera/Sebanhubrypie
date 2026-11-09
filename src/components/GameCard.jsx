import './GameCard.css'
import { Link } from 'react-router'

function GameCard({ nom, description, joueurs, path }) {
  return (
    <article className="game-card">
      <div className="game-illustration">
        <h2>{nom}</h2>
      </div>

      <div className="game-info">
        <div className="game-description">
          <p>{description}</p>
          <span>{joueurs} joueur{joueurs > 1 ? 's' : ''}</span>
        </div>

        <Link to={path}>
          <button className="play-button">
            Jouer
          </button>
        </Link>
      </div>
    </article>
  )
}

export default GameCard
