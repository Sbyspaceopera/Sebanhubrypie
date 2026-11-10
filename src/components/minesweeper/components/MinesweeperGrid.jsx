import './MinesweeperGrid.css';

import { useState } from "react"
import MinesweeperCell from "./MinesweeperCell";
import deserticBackground from '../../../assets/minesweeper/minesweeper-background.jpg'

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// 0 = no mine, -1 = mine
function createGrid(gridSize, minesNumber) {
    const grid = Array.from({ length: gridSize }, () =>
        Array(gridSize).fill(0)
    );

    let placed = 0;

    while (placed < minesNumber) {
        const row = getRandomInt(gridSize);
        const col = getRandomInt(gridSize);

        if (grid[row][col] !== -1){
            grid[row][col] = -1;
            placed++;
        }
    }

    return grid;
}


export default function MinesweeperGrid({isGameOver, gameOver, gridSize, minesNumber, setScore, score, isFlagMode}){
    const [grid, setGrid] =  useState(() => createGrid(gridSize, minesNumber));

    const style = {
    "--grid-size": gridSize,
        backgroundImage: `url("${deserticBackground}")`,
        backgroundSize: "cover",
    };

    return (
        <div className="minesweeper-grid-container" style={style}>

        {grid.map((row, rowIndex) => (
            row.map((cell, colIndex) => (
               <MinesweeperCell gameOver={gameOver} setScore={setScore} score={score} isFlagMode={isFlagMode} cellType={cell} colIndex={colIndex} grid={grid} position={[rowIndex,colIndex]} /> 
            ))
            
        ))}

        {isGameOver ?
            <div className='minesweeper-gameover-modal'>
                <h2>GAME OVER</h2>
            </div>
        :
            null
        }

        </div>
    )

}