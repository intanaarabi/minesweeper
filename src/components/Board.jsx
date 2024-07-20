import Counter from "./Counter";
import Restart from "./Restart";
import Tile from "./Tile"
import { useEffect, useState } from "react"
import Timer from "./Timer";
import SuccessModal from './modals/SuccessModal'

function Board() {
    const MAX_ROWS = 9;
    const MAX_COLS = 9;
    const MAX_MINES = 10;

    const [board,setBoard] = useState([])
    const [flagCount, setFlagsCount] = useState(MAX_MINES)
    const [gameActive,setGameActive] = useState(false)
    const [gamePaused,setGamePaused] = useState(false)
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);

    const toggleFailedModal = () => {
        setIsFailedModalOpen(!isFailedModalOpen);
        resetGame()
    }

    const toggleSuccessModal = () => {
        setIsSuccessModalOpen(!isSuccessModalOpen);
        resetGame()
    }

    useEffect(()=> {
        resetGame()
    }, [])

    const startGame = () => {
        setGameActive(true)
    }

    const endGame = () => {
        setGamePaused(true)
    }

    const gameWon = () => {
        endGame()
        setIsSuccessModalOpen(true)
    }

    const gameOver = () => {
        endGame()
        setIsFailedModalOpen(true)
    }
  
    const resetGame = () => {
        setGameActive(false)
        setGamePaused(false)
        initializeEmptyBoard()
        setFlagsCount(MAX_MINES)
    }

    const initializeEmptyBoard = () => {
        const board = Array.from({length: MAX_ROWS}, () => 
            Array.from({length: MAX_COLS}, () => ({
                    mine: false,
                    visible: false,
                    flag: false,
                    count: 0,
            }))
        )
        setBoard(board)
    }

    const placeMines = (board,excludeRow,excludeCol) => {
        const tileIndices = [];
        for (let row = 0; row < MAX_ROWS; row++) {
            for (let col = 0; col < MAX_COLS; col++) {
                // Exclude the first click position
                if (row !== excludeRow || col !== excludeCol) {
                    tileIndices.push([row, col]);
                }
            }
        }
    
        // Randomize the tile indices list
        for (let i = tileIndices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tileIndices[i], tileIndices[j]] = [tileIndices[j], tileIndices[i]];
        }
    
        // Place mines
        for (let i = 0; i < MAX_MINES; i++) {
            const [row, col] = tileIndices[i];
            board[row][col].mine = true;
            updateAdjacentCounts(board, row, col);
        }
    }

    const iterateAdjacentTiles = (board, row, col, callback) => {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const adjRow = row + i;
                const adjCol = col + j;
    
                if (
                    adjRow >= 0 &&
                    adjRow < MAX_ROWS &&
                    adjCol >= 0 &&
                    adjCol < MAX_COLS &&
                    !(i === 0 && j === 0)
                ) {
                    callback(board, adjRow, adjCol);
                }
            }
        }
    };
    
    const updateAdjacentCounts = (board, row, col) => {
        iterateAdjacentTiles(board, row, col, (board, adjRow, adjCol) => {
            if (!board[adjRow][adjCol].mine) {
                board[adjRow][adjCol].count++;
            }
        });
    };
    
    const revealEmptyAdjacentTiles = (board, row, col) => {
        const stack = [[row, col]];
    
        while (stack.length > 0) {
            const [currentRow, currentCol] = stack.pop();
    
            iterateAdjacentTiles(board, currentRow, currentCol, (board, adjRow, adjCol) => {
                if (!board[adjRow][adjCol].mine && !board[adjRow][adjCol].visible) {
                    board[adjRow][adjCol].visible = true;
                    if (board[adjRow][adjCol].count === 0) {
                        stack.push([adjRow, adjCol]);
                    }
                }
            });
        }
    };
    
    const revealAdjacentTiles = (board, row, col) => {
        let gameOver = false;
    
        iterateAdjacentTiles(board, row, col, (board, adjRow, adjCol) => {
            if (!board[adjRow][adjCol].visible && !board[adjRow][adjCol].flag) {
                board[adjRow][adjCol].visible = true;
                if (board[adjRow][adjCol].mine) {
                    gameOver = true;
                } else if (board[adjRow][adjCol].count === 0) {
                    revealEmptyAdjacentTiles(board,adjRow,adjCol)
                }
            }
        });
    
        if (gameOver) {
            revealMineTiles(board)
            gameOver();
        }
    };

    const revealMineTiles = (board) => {
        board.forEach(row => {
            row.forEach(cell => {
                if (cell.mine) {
                    cell.visible = true;
                }
            });
        });
    }
    

    const hasAdjacentFlags = (board, row, col) => {
        let flagsCount = 0;
    
        iterateAdjacentTiles(board, row, col, (board, adjRow, adjCol) => {
            if (board[adjRow][adjCol].flag) {
                flagsCount += 1;
            }
        });
    
        return flagsCount === board[row][col].count;
    };
    
    const userWon = (board) => {
        return board.every(row =>
            row.every(col => col.mine || col.visible)
        );
    };

    const populateFlags = (board) => {
        board.forEach(row => 
            row.forEach(col => {
                if (col.mine && !col.visible && !col.flag) {
                   col.flag = true
                   setFlagsCount(flagCount-1)
                }
            })
        )
    }


    const revealTiles = (row,col) => {
        const newBoard = [...board];
        const tile = newBoard[row][col]

        if (!tile.visible) {
            tile.visible = true;
            if (!gameActive) {
                startGame()
                placeMines(newBoard, row, col);   
            }
            if (tile.mine) {
                revealMineTiles(newBoard)
                gameOver()
            } else {
                if (tile.count === 0) {
                    revealEmptyAdjacentTiles(newBoard,row,col)
                }
            }
        } else if (tile.count > 0 && hasAdjacentFlags(board,row,col)) {
            revealAdjacentTiles(newBoard,row,col)
        }

        if (userWon(newBoard)) {
            populateFlags(newBoard)
            gameWon();
        }
        setBoard(newBoard);
    }

    const attachFlag = (row,col) => {
        const newBoard = [...board];
        const tile = newBoard[row][col]

        if (!tile.visible) {
            if (!tile.flag ) {
                setFlagsCount(flagCount-1)
            } else {
                setFlagsCount(flagCount+1)
            }
            tile.flag = !tile.flag
            setBoard(newBoard);
        }

    }

    return (
        <>
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
                <Timer gameActive={gameActive} gamePaused={gamePaused}/>
            {/* Tile */}
            </div>

            <div className="flex flex-col gap-1">
                {board.map((row, rowIndex) => (
                    <div className="flex flex-row gap-1" key={rowIndex}>
                        {row.map((tile, colIndex) => (
                            <Tile 
                            onClick={()=> !gamePaused && revealTiles(rowIndex,colIndex)}
                            onRightClick={()=> !gamePaused && attachFlag(rowIndex,colIndex)}
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
        <SuccessModal isOpen={isSuccessModalOpen} onClose={toggleSuccessModal}/>
        </>
       
    )
}

export default Board
