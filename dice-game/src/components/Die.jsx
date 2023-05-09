import React from 'react'
import './Die.css'

function Die(props) {

  const chosen = { backgroundColor: props.isHeld ? "#59E391" : "white" }

  return (
    <div className='dice' style={chosen} onClick={props.holdDice}>
      <h2>{props.value}</h2>
    </div>
  )
}

export default Die