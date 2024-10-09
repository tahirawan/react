import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import {useState} from "react";
import Log from "./components/Log.jsx";
import {WINNING_COMBINATIONS} from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const PLAYERS = {
    'X': 'Player 1',
    'O': 'Player 2'
}

const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function deriveActivePlayer(gameTurns) {
    let currentPlayer = 'X';

    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
    }

    return currentPlayer;
}

function deriveGameBoard(gameTurns) {
    let gameBoard = [...INITIAL_GAME_BOARD.map(innerArray => [...innerArray])];

    for (const turn of gameTurns) {
        const {square, player} = turn;
        const {row, col} = square;

        gameBoard[row][col] = player
    }

    return gameBoard;
}

function deriveWinner(gameBoard, players) {
    let winner;

    //deriving winner
    for (const combination of WINNING_COMBINATIONS) {
        // console.log('winner combination: ', winner);
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

        if (firstSquareSymbol &&
            firstSquareSymbol === secondSquareSymbol &&
            secondSquareSymbol === thirdSquareSymbol
        ) {
            winner = players[firstSquareSymbol];
        }
    }

    return winner;
}

function App() {
    const [players, setPlayers] = useState(PLAYERS)
    const [gameTurns, setGameTurns] = useState([])

    let currentPlayer = deriveActivePlayer(gameTurns);

    const gameBoard = deriveGameBoard(gameTurns);

    const winner = deriveWinner(gameBoard, players);

    const hasDraw = gameTurns.length === 9 && !winner;

    function resetGame() {
        setGameTurns([]);
    }

    function handleSelectSquare(rowIndex, colIndex) {
        // setActivePlayer((currentActivePlayer) => currentActivePlayer === 'X' ? 'O' : 'X' );

        setGameTurns(prevTurns => {
            const currentPlayer = deriveActivePlayer(prevTurns);

            /*let currentPlayer = 'X';

            if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
                currentPlayer = 'O';
            }*/

            return [
                {square: {row: rowIndex, col: colIndex}, player: currentPlayer},
                ...prevTurns
            ];
        })
    }

    function handlerPlayerNameChange(symbol, newName) {
        setPlayers(prevPlayers => {
            return {
                ...prevPlayers,
                [symbol]: newName
            }
        });
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player
                        initialName={PLAYERS.X}
                        symbol="X"
                        isActive={currentPlayer === 'X'}
                        onChangeName={handlerPlayerNameChange}
                    />
                    <Player
                        initialName={PLAYERS.O}
                        symbol="O"
                        isActive={currentPlayer === 'O'}
                        onChangeName={handlerPlayerNameChange}
                    />
                </ol>
                {(winner || hasDraw) && <GameOver winner={winner} onPlayAgain={resetGame}/>}
                <GameBoard
                    onSelectSquare={handleSelectSquare}
                    board={gameBoard}/>
            </div>
            <Log turns={gameTurns}/>
        </main>
    )
}

export default App
