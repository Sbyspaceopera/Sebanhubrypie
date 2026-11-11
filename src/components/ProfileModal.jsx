import { useState } from 'react'
import { X, UserRound } from 'lucide-react'
import './ProfileModal.css'
import { GAMES } from '/src/constants'

function ProfileModal({ onClose }) {
  const [pseudo, setPseudo] = useState(
    () => localStorage.getItem('pseudo') || 'Joueur'
  )

  const [stats] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('gameStats')) || {}
    } catch {
      return {}
    }
  })

  function savePseudo() {
    const nouveauPseudo = pseudo.trim() || 'Joueur'
    setPseudo(nouveauPseudo)
    localStorage.setItem('pseudo', nouveauPseudo)
  }

  return (
    <div className="profile-overlay" onClick={onClose}>
      <section
        className="profile-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="profile-top">
          <h2 id="profile-title">Mon profil</h2>
          <button onClick={onClose} aria-label="Fermer">
            <X size={22} />
          </button>
        </div>

        <div className="profile-info">
          <UserRound size={42} />

          <label htmlFor="pseudo">Ton pseudo</label>
          <input
            id="pseudo"
            value={pseudo}
            maxLength={25}
            onChange={(e) => setPseudo(e.target.value)}
          />

          <button className="save-pseudo" onClick={savePseudo}>
            Enregistrer
          </button>
        </div>

        <div className="profile-stats">
          <h3>Mes statistiques</h3>

          {GAMES.map((game) => {
            const count = stats[game.nom] || 0

            return (
              <div className="stat-row" key={game.id}>
                <span>{game.nom}</span>
                <span>
                  {count} {count > 1 ? 'parties jouées' : 'partie jouée'}
                </span>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default ProfileModal
