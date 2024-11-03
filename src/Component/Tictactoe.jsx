
import React, { useState } from 'react'
import TicTac from './hook/TicTac'
function Tictactoe() {
  const {board,Hadleclick,culculateWinner,GetstatusMessage,reseetGame} = TicTac();
  

  return (
    <div className=' h-[500px] w-[500px] mx-auto'>
      <div className=' text-xl mt-4'>
        {GetstatusMessage()}
        <button className=' p-2 rounded-md mr-10 bg-green-600 ml-40' onClick={reseetGame}>  reset game</button>
      </div>
      <div className=' flex flex-wrap font-bold  mt-4'>
        {board.map((b,index)=>{
          return <button 
          onClick={()=>Hadleclick(index)} className=' w-[160px]  text-4xl h-[160px] bg-slate-400 border-4 inlin' 
          disabled={b !== null}
          key={index}>
            {b}
          </button>
        })}
      </div>

    </div>
  )
}

export default Tictactoe
