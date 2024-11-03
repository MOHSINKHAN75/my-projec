import React, { useState } from 'react'

const Player ={
  A:0,
  B: 1
}
 const PlayerIcon = {
  [Player.A]: "X",
  [Player.B]: "0"
 }
const Default = {
   [Player.A]: [],
  [Player.B]: []
}
function Navbar() {
 
  const [ActivePlayer, setActivePlayer]= useState(Player.A)
  const [playerTurn, setPlayerTurn]= useState(structuredClone(Default))


  const Handleplayer = (index)=>{
    return ()=>{
      const newPlayer = ActivePlayer ==Player.A? Player.B : Player.A
      const oldPlayerTurn = structuredClone(playerTurn)
      oldPlayerTurn[ActivePlayer].push(stirg(index))
      setPlayerTurn(oldPlayerTurn)
    setActivePlayer(newPlayer)
    }
  }
  // const playerTurns = PlayerIcon[ActivePlayer];

  const button = Array.from(new Array(9))
  return (
    <>
      <div className='h-[600px] w-[600px]  overflow-hidden '>
{
  button.map((_,index)=>{

    const Othersplayers =ActivePlayer ==Player.A? Player.B: Player.A;
    const CurrentTurn = playerTurn[ActivePlayer]
    const otherplayersturn = playerTurn[Othersplayers]

    let icon= '';
    if(CurrentTurn.join("").includes(String(index))){

       icon = PlayerIcon[ActivePlayer];
    }else if(otherplayersturn.join('').includes(String(index))){
      icon = PlayerIcon[Othersplayers];
  console.log(Othersplayers)

    }



    return<button onClick={()=>Handleplayer(index)} className='w-[190px] h-[190px] bg-slate-400 font-bold text-[30px]  border-4'   key={index} ></button>
  }

  )
}


      

      </div>
    </>
  )
}

export default Navbar
