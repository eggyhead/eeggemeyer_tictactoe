import React, { useState } from 'react';
import {newBoard, turn, evaluateWin, gameIsOver, startingPlayer} from '../game/game'
import './board.css'
const Board = () => {
    const [board, setBoard] = useState(newBoard())
    const [player, setPlayer] = useState(startingPlayer())
    const [won, setWon] = useState(false)
    const [isOver, setIsOver] = useState(false)
    const takeTurn = (row: number, column: number) => {
        // set val
        setBoard(turn(row, column, board, player))
        // evaluate win
        setWon(evaluateWin(board, player))
        const hasWon = evaluateWin(board, player)
        const isOver = gameIsOver(board)
        // if not win, set next player 
        if (hasWon === false && isOver === false) {
            if (player === "X") {
                setPlayer("O")
            } else {
                setPlayer("X")
            }
        } else if (hasWon) {
            setWon(hasWon)
        } else {
            setIsOver(isOver)
        }
    }
    const resetBoard = ()=> {
        setBoard(newBoard)
        setPlayer(startingPlayer())
        setWon(false)
        setIsOver(false)
    }

    const headerText = () => {
        if (isOver) {
            return <div>Game is over!</div>
        } else if (won) {
            return <div>Player {player} won!</div>
        } else {
            return <div>Playing: {player}</div>
        }
    }
    const restartText = () => {
        if (isOver || won ) return <div><button onClick={resetBoard} className="restart-btn">Click</button> to start a new game</div>
    }

    return (
        <div>
            {headerText()}
            {restartText()}
            {board.map((row, i) => {
                return (
                    <div key={i} className="row-container">{
                        row.map((col, j) => <div key={j} className="col-val" onClick={() => takeTurn(i, j)}>{col}</div>)
                    }</div>
                )
            })}
            
        </div>
    )
}

export default Board
