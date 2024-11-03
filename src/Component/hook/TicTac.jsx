import React, { useState } from 'react'
const inetialBoard = ()=> Array(9).fill(null)

function TicTac() {
    const [board, setBoard]= useState(inetialBoard())
    const [isxturn,setIsxturn]= useState(true)

    const WINNING_PATTERN = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [1,4,7],
        [2,5,8],
        [0,3,6],
        [0,4,8],
        [2,4,6]
    ];
    const culculateWinner = (currentBoard)=>{
        for(let i=0; i<WINNING_PATTERN.length; i++){
            const [a,b,c]= WINNING_PATTERN[i]
            if(currentBoard[a] &&currentBoard[a]==currentBoard[b]&& currentBoard[a]==currentBoard[c] ){
                return currentBoard[a]
            }
        }
              return null;
    }
    // console.log(culculateWinner)
    const Hadleclick = (index)=>{
// check winner 
const winnner  =culculateWinner(board)
console.log(winnner)
if(winnner || board[index]) return;

const newBoard = [...board]
newBoard[index]= isxturn? "X":"O"
setBoard(newBoard)
setIsxturn(!isxturn)
console.log(newBoard)
    }
    const GetstatusMessage = ()=>{
        const winner = culculateWinner(board)
        if(winner) return `Player ${winner} wins!`;
        if(!board.includes(null)) return `it's draw`
        return `Player ${isxturn ? "X":"O"} Turn`

    }
    const reseetGame = ()=>{
        setBoard(inetialBoard())
        setIsxturn(true)

    }


  return {board,Hadleclick,culculateWinner,GetstatusMessage,reseetGame}
}

export default TicTac
