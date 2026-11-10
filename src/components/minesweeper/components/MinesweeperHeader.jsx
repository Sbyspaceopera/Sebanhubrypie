import './MinesweeperHeader.css'
import headerBackground from '../../../assets/minesweeper/minesweeper-header-background.jpg'

export default function MinesweeperHeader({restartGame, playerName, stopGame, score,topScore, MAX_SCORE}){
    const style={
        backgroundImage:`url("${headerBackground}#)`,
        backgroundSize: "cover",
    }

    return(
        <section className="minesweeper-header" style={style}>
            <p className="minesweeper-player-name">{playerName}</p>
            <p className='minesweeper-score'>Score : <span className='minesweeper-score-int'>{score}/{MAX_SCORE}</span></p>
            { topScore
                ?
                <p className='minesweeper-score'>Meilleur score : <span className='minesweeper-score-int'>{topScore}</span></p>
                :
                null
            }
            <div className='minesweeper-header-buttons-container'>
                <button className='minesweeper-quit-button' onClick={stopGame}>QUITTER</button>
                <button className='minesweeper-restart-button' type="button" onClick={restartGame}>
                    Recommencer
                </button>
            </div>
        </section>
    )

}