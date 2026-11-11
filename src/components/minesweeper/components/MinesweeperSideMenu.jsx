import './MinesweeperSideMenu.css'
import { FlagTriangleRightIcon } from "lucide-react"
import metalicBackground from '/src/assets/minesweeper/minesweeper-sidemenu-background.webp'

export default function MinesweeperSideMenu({toggleFlagMode}){

    const style = {
            backgroundImage: `url("${metalicBackground}")`,
            backgroundSize: "250px auto",
            backgroundRepeat: "repeat"
        };
    

    return (
        <section className="minesweeper-side-menu" style={style}>
            <button>
                <FlagTriangleRightIcon onClick={toggleFlagMode} color="red" />
            </button>
        </section>
    )
}