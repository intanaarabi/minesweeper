import Counter from "./Counter";
import Restart from "./Restart";
import Tile from "./Tile"
import { useEffect, useState } from "react"
import Timer from "./Timer";

function Board() {
    const MAX_ROWS = 9;
    const MAX_COLS = 9;
    const MAX_MINES = 10;

    const [board,setBoard] = useState([])
    const [flagCount, setFlagsCount] = useState(MAX_MINES)
    const [gameActive,setGameActive] = useState(false)


    useEffect(()=> {
        initializeBoard()
    }, [])

    const startGame = () => {
        setGameActive(true)
    }

    const endGame = () => {
        setGameActive(false)
    }

    const resetGame = () => {
        endGame()
        initializeBoard()
        setFlagsCount(MAX_MINES)
    }

    const initializeBoard = () => {
        const board = Array.from({length: MAX_ROWS}, () => 
            Array.from({length: MAX_COLS}, () => ({
                    mine: false,
                    visible: false,
                    flag: false,
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

        setBoard(board)
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
                    board[adjRow][adjCol].count++;
                }
            }
        }
    }

    const revealAdjacentTiles = (board, row, col) => {
        const stack = [[row, col]];
    
        while (stack.length > 0) {
            const [currentRow, currentCol] = stack.pop();
    
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const adjRow = currentRow + i;
                    const adjCol = currentCol + j;
    
                    if (
                        adjRow >= 0 &&
                        adjRow < MAX_ROWS &&
                        adjCol >= 0 &&
                        adjCol < MAX_COLS &&
                        !(i === 0 && j === 0) &&
                        !board[adjRow][adjCol].mine &&
                        !board[adjRow][adjCol].visible
                    ) {
                        board[adjRow][adjCol].visible = true;
                        if (board[adjRow][adjCol].count === 0) {
                            stack.push([adjRow, adjCol]);
                        }
                    }
                }
            }
        }
    };
    

    const revealTiles = (row,col) => {
        const newBoard = [...board];
        const tile = newBoard[row][col]

        if (!tile.visible) {
            tile.visible = true;
        
            if (!gameActive) {
                startGame()
            }
    
            if (tile.mine) {
                endGame()
            } else {
                if (tile.count === 0) {
                    revealAdjacentTiles(newBoard,row,col)
                }
            }
            setBoard(newBoard);
        }
    }

    const attachFlag = (row,col) => {
        const newBoard = [...board];
        const tile = newBoard[row][col]

        if (!tile.flag) {
            setFlagsCount(flagCount-1)
        } else {
            setFlagsCount(flagCount+1)
        }
        tile.flag = !tile.flag

        setBoard(newBoard);

    }

    return (
        <div className="z-10
            border border-[#584561]
            bg-opacity-[0.02]
            bg-white
            rounded-md
            p-5
            flex gap-5 flex-col">
            <div className="flex flex-row justify-between align-center">
            {/* Buttons */}
                {/* Flags Tracker */}
                <Counter value={flagCount}/>
                {/* Restart */}
                <Restart onClick={()=>resetGame()}/>
                {/* Timer */}
                <Timer gameActive={gameActive}/>
            {/* Tile */}
            </div>

            <div className="flex flex-col gap-1">
                {board.map((row, rowIndex) => (
                    <div className="flex flex-row gap-1" key={rowIndex}>
                        {row.map((tile, colIndex) => (
                            <Tile 
                            onClick={()=>revealTiles(rowIndex,colIndex)}
                            onRightClick={()=>attachFlag(rowIndex,colIndex)}
                            key={`${rowIndex}-${colIndex}`}
                            mine={tile.mine}
                            count={tile.count}
                            visible={tile.visible}
                            flag={tile.flag}
                            />
                        ))}
                    </div>
                )
                )}
            </div>
        </div>
    )
}

export default Board
