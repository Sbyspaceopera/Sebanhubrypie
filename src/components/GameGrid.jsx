import GameCard from './GameCard'
import './GameGrid.css'

import { GAMES } from '../constants'

function GameGrid() {
  return (
    <section className="game-section">
      <div className="game-section-header">
        <h1>Choisis ton jeu</h1>
        <p>{GAMES.length}Jeux disponibles</p>
      </div>

      <div className="game-grid">
        {GAMES.map((game) => (
          <GameCard
            key={game.id}
            nom={game.nom}
            description={game.description}
            joueurs={game.joueurs}
            path={game.path}
          />
        ))}
      </div>
    </section>
  )
}

export default GameGrid
