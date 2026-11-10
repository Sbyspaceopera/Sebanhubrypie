import './Minesweeper.css'
import MinesweeperHeader from "./MinesweeperHeader";
import MinesweeperGrid from "./MinesweeperGrid";
import MinesweeperSideMenu from "./MinesweeperSideMenu";

import { useState, useEffect } from "react";

export default function Minesweeper({playerName, stopGame}){
    const MINES_NUMBER = 20;
    const GRID_SIZE = 10;
    const MAX_SCORE = (GRID_SIZE * GRID_SIZE) - MINES_NUMBER;
    
    const [score, setScore] = useState(0);
    const [isFlagMode, setFlagMode] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [gameId, setGameId] = useState(0);

    function restartGame() {
        setScore(0);
        setFlagMode(false);
        setGameId(previousId => previousId + 1);
        setIsGameOver(false);
    }

    const toggleFlagMode = () => {
        setFlagMode(!isFlagMode)
    }

    const gameOver = () => {
        setIsGameOver(true);
    }

    return (
        <div className='minesweeper-container'>
            <MinesweeperHeader key={gameId} restartGame={restartGame} playerName={playerName} stopGame={stopGame} score={score} MAX_SCORE={MAX_SCORE}/>
            <MinesweeperGrid gameOver={gameOver} isGameOver={isGameOver} key={gameId} isFlagMode={isFlagMode} gridSize={GRID_SIZE} minesNumber={MINES_NUMBER} setScore={setScore} score={score}/>
            <MinesweeperSideMenu toggleFlagMode={toggleFlagMode} />
        </div>
    )

}