import Counter from "./Counter";
import Restart from "./Restart";
import Tile from "./Tile"
import { useEffect, useState } from "react"

function Board() {
    const [board,setBoard] = useState([])
    const MAX_ROWS = 9;
    const MAX_COLS = 9;
    const MAX_MINES = 10;

    useEffect(()=> {
        const board = initializeBoard()
        setBoard(board);
    }, [])

    const initializeBoard = () => {
        const board = Array.from({length: MAX_ROWS}, () => 
            Array.from({length: MAX_COLS}, () => ({
                    mine: false,
                    visible: false,
                    count: 0,
            }))
        )
    
       //Generate list of possible row,col combinations
       const tileIndices = []
       for (let row = 0; row < MAX_ROWS; row++) {
        for (let col = 0; col < MAX_COLS; col++) {
            tileIndices.push([row,col])
        }
       }

       //Randomize indice list, select first 10
       for (let i = tileIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [tileIndices[i], tileIndices[j]] = [tileIndices[j],tileIndices[i]]
       }

       for (let i=0;i < MAX_MINES; i++) {
        const [row,col] = tileIndices[i]
        board[row][col].mine = true;
        updateAdjacentCounts(board,row,col)
        board[row][col].count = 0;
       }

        return board
    }

    const updateAdjacentCounts = (board,row,col) => {
        for (let i = -1; i <=1; i++) {
            for (let j = -1; j <=1; j++) {
                const adjRow = row + i;
                const adjCol = col + j;

                if (
                    adjRow >= 0 &&
                    adjRow < MAX_ROWS &&
                    adjCol >= 0 &&
                    adjCol < MAX_COLS &&
                    !(i===0 && j===0) &&
                    !board[adjRow][adjCol].mine
                ) {
                    if (!board[adjRow][adjCol].mine) {
                        board[adjRow][adjCol].count++;
                    }
                }
            }
        }
    }

    return (
        <div className="z-10
            border border-[#584561]
            bg-opacity-[0.03]
            bg-white
            rounded-md
            p-5
            flex gap-5 flex-col">
            <div className="flex flex-row justify-between align-center">
            {/* Buttons */}
                {/* Flags Tracker */}
                <Counter/>
                {/* Restart */}
                <Restart/>
                {/* Timer */}
                <Counter/>
            {/* Tile */}
            </div>

            <div className="flex flex-col gap-1">
                {board.map((row, rowIndex) => (
                    <div className="flex flex-row gap-1" key={rowIndex}>
                        {row.map((tile, colIndex) => (
                            <Tile key={`${rowIndex}-${colIndex}`} mine={tile.mine} count={tile.count} />
                        ))}
                    </div>
                )
                )}
            </div>
        </div>
    )
}

export default Board
