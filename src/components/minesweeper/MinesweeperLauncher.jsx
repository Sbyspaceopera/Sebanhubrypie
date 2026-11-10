import './MinesweeperLauncher.css'

import Minesweeper from './components/Minesweeper';

import { useState } from 'react';

export default function MinesweeperLauncher() {
    const [isLaunched, setIsLaunched] = useState(false);
    const [pseudo, setPseudo] =  useState("");

    const launchGame = () => {
        setIsLaunched(true);
    }

    const stopGame = () => {
        setIsLaunched(false);
    }

    const pseudoHandler = (e) => {
        let str = e.target.value.trim()
        if(str){
            setPseudo(str)
        };
    }

    return (
        <div className="minesweeper-launcher-container">
        {isLaunched 
            ?
            <Minesweeper playerName={pseudo} stopGame={stopGame} />
            :
            <> 
                <label className="minesweeper-name-label" for="pseudo">Ton pseudo :
                    <input className='minesweeper-name-input' onChange={pseudoHandler} name="pseudo" type="text" placeholder="John Doe">
                    </input>
                </label>
                {pseudo
                ?
                <button className='minesweeper-play-button' onClick={launchGame}>Jouer</button>
                :
                null
                }
            </>
        }
        </div>
    )
}