import { useState } from "react"
import './MinesweeperCell.css'
import { FlagTriangleRightIcon } from "lucide-react"

//Check all direct neighbours
function calculateProximityScore(grid, position) {
  const [row, col] = position
  let score = 0

  for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
    for (let colOffset = -1; colOffset <= 1; colOffset++) {
      if (rowOffset === 0 && colOffset === 0) continue

      const neighbor = grid[row + rowOffset]?.[col + colOffset]

      if (neighbor === -1) {
        score++
      }
    }
  }

  return score
}

export default function MinesweeperCell({gameOver, setScore, score, cellType, colIndex, grid, position, isFlagMode}){
    const [isReveal, setIsReveal] = useState(false);
    const [isFlagged, setIsFlagged] = useState(false);

    const proximityScore = calculateProximityScore(grid,position);

    const handleClick = (e) => {
        if(isFlagMode){
            setIsFlagged(!isFlagged)
        }else{
            setIsReveal(true);
            if(cellType !== -1){
                let newScore = score + 1;
                setScore(newScore);
            }else{
                gameOver();
            }
        }
    }
    
    return (
        <button className={isReveal ? "minesweeper-cell minesweeper-active-cell" : "minesweeper-cell"} onClick={handleClick} key={colIndex} type="button">
            {
                isReveal ? 
                    cellType === -1 ? "💣" : proximityScore
                :
                    isFlagged ? <FlagTriangleRightIcon color="red" />  : ""
            }
        </button>
    )
}