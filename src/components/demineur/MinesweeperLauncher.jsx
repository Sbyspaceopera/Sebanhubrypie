import './MinesweeperLauncher.css'

export default MinesweeperLauncher = () => {
    const [isLaunched, setIsLaunched] = false;
    const [pseudo, setPseudo] =  "";

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
        <div className="demineur-container">
        {isLaunched 
            ?
            //<Minesweeper playerName={pseudo} stopGame={stopGame} />
            <p>Please replace this HTML element by a LaunchedMineSweeper when it has been written.</p>
            :
            <>            
                <label for="pseudo">Your pseudo :
                    <input onChange={pseudoHandler} name="pseudo" type="text" placeholder="John Doe">
                    </input>
                </label>
                {pseudo
                ?
                <button className='demineur-play-button' onClick={launchGame}>Play</button>
                :
                null
                }
            </>
        }
        </div>
    )
}