import './MinesweeperLauncher.css'

import Minesweeper from './components/Minesweeper';

import { GAMES } from '/src/constants';

import { useState } from 'react';

export default function MinesweeperLauncher() {
    const [isLaunched, setIsLaunched] = useState(false);
    const [pseudo, setPseudo] =  useState(localStorage.getItem('pseudo') ?? "");

    const launchGame = (e) => {
        e.preventDefault();

        if (!pseudo) return;

        incrementPartyCounter();
        setIsLaunched(true);
    };

    const stopGame = () => {
        setIsLaunched(false);
    }

    const pseudoHandler = (e) => {
        let str = e.target.value.trim()
        setPseudo(str)
    }

    const incrementPartyCounter = () => {
        try{
            const gameStats = JSON.parse(localStorage.getItem("gameStats")) ?? {};
            const minesweeperKey = GAMES[3].nom;

            gameStats[minesweeperKey] = (gameStats[minesweeperKey] ?? 0) + 1;

            localStorage.setItem("gameStats", JSON.stringify(gameStats));
            
        }catch(e){
            console.log(e)
        }
        
        
    }
    return (
        <div className="minesweeper-launcher-container">
        {isLaunched 
            ?
            <Minesweeper incrementPartyCounter={incrementPartyCounter} playerName={pseudo} stopGame={stopGame} />
            :
            <form onSubmit={launchGame}> 
                <label className="minesweeper-name-label" htmlFor="pseudo">Ton pseudo :
                    <input className='minesweeper-name-input' onChange={pseudoHandler} name="pseudo" type="text" value={pseudo} placeholder="JohnDoe">
                    </input>
                </label>
                {pseudo
                ?
                <button className='minesweeper-play-button' type='submit'>Jouer</button>
                :
                null
                }
            </form>
        }
        </div>
    )
}