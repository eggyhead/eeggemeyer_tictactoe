export const newBoard = ( ) => [["", "", ""], ["", "", ""], ["", "", ""]];

export const startingPlayer = () => {
    return ["X", "O"][Math.floor(Math.random() * 1)]
}
export const turn = (x: number, y: number, board: string[][], val: string) =>{
    board[x][y] = val
    return board
}

const rowWin = (board: string[][], val: string) => {
    let win = false;
    board.forEach(row => {
        const matching = row.filter(item => val === item)
        if (matching.length === 3) {
            win = true 
        }
    })
    return win
}

const colWin = (board: string[][], val: string) => {
    let win = false;
    for (let i = 0; i <=2; i++) {
        const colValA = board[0][i]
        const colValB = board[1][i]
        const colValC = board[2][i]
        if (colValA === val && colValB === val && colValC === val) {
            win = true
        }
    }
    return win
}

const diagWin = (board: string[][], val: string) => {
    let win = false
    const diags = [
        [board[0][0], board[1][1], board[2][2]],
        [board[0][2], board[1][1], board[2][0]]
    ]

    diags.forEach((diag, i) => {
        const matching = diag.filter(item => val === item)
        if (matching.length === 3) {
            win = true
        }
    })

    return win
}

export const evaluateWin = (board: string[][], val: string) => {
    // row win -- all values across row are the same 
    // column win -- all values at index 0, index 1 or index 2 are the same 
    // diagonal win -- values are the same at:
    //  row0,col0, row1,col1, row2,col2 OR 
    //  row0,col2, row1,col1, row2,col0 
    const possibleWins = [rowWin(board, val), colWin(board, val), diagWin(board, val)]
    const hasWon = possibleWins.filter(win => win === true).length > 0
    return hasWon
}

export const gameIsOver = (board: string[][]) => {
    const allVals = board.flat()
    return allVals.indexOf("") === -1
}


export {}
