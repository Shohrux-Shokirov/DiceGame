import { nanoid } from 'nanoid'
import { useEffect, useRef, useState } from 'react'
import Confetti from 'react-confetti'
import './App.css'
import Die from './components/Die'
import { GiPerspectiveDiceSixFacesSix } from 'react-icons/gi'
import { RiTimerLine } from 'react-icons/ri'
import { BsFillDice1Fill as One,  BsFillDice2Fill as Two, BsFillDice3Fill as Three, BsFillDice4Fill as Four, BsFillDice5Fill as Five, BsFillDice6Fill as Six} from 'react-icons/bs'


function App() {

  const dices = [<One />, <Two />, <Three />, <Four />, <Five />, <Six />]


  const [numbers, setNumbers] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [rolls, setRolls] = useState(0)
  const [timer, setTimer] = useState(0)
  const [show, setShow] = useState(false)
  const [starter, setStarter] = useState(true)
  const timerId = useRef()

  
  useEffect(() => {
    const allHeld = numbers.every(num => num.isHeld)
    const firstValue = numbers[0].value.type
    const allSAmeValue = numbers.every(num => num.value.type === firstValue)
    if (allHeld && allSAmeValue) {
      setTenzies(true)
      clearInterval(timerId.current)
      setShow(true)
    }
  }, [numbers])
  
  
  function generateNewDIe() {
    return {
      value: dices[Math.ceil(Math.random() * dices.length - 1)],
      isHeld: false,
      id: nanoid()
    }
  }
  window.addEventListener('click', (e) => {
    if (e.target.className === 'modal-container') {
      setShow(false)
    }
  })

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDIe())
    }
    return newDice
  }

  function roll() {
    if (!tenzies) {
      setRolls(prevRoll => prevRoll + 1)
      setNumbers(oldNum => oldNum.map((num) => {
        return num.isHeld ? num : generateNewDIe()
      }))
    } else {
      setTenzies(false)
      setNumbers(allNewDice())
      setRolls(0)
      setTimer(0)
      setStarter(true)
    }
  }

  function start() {
    setStarter(false)
    setNumbers(allNewDice())
    timerId.current = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1)
    }, 1000)
  }

  function holdDice(id) {
    setNumbers(oldNum => oldNum.map((num) => {
      return num.id === id ?
        { ...num, isHeld: !num.isHeld } :
        num
    }))
  }

  return (
    <div className="App">
      {
        show &&
        <div className="modal-container">
          <div className="modal">
            <h2>Your result</h2>
            <p><RiTimerLine />: {timer} sec</p>
            <p><GiPerspectiveDiceSixFacesSix />: {rolls} rolls</p>
          </div>
        </div>
      }
      {
        tenzies && <Confetti />
      }
      <div>
        <h1 className='title'>Tenzies</h1>
        <pre className='inst'>Roll untill all dice are the same. Click <br /> each die to freez it at its current <br /> value between rolls</pre>
      </div>
      <div className='dice-container'>
        {
          numbers && numbers.map((num, ind) => <Die key={ind} value={num.value} isHeld={num.isHeld} holdDice={() => holdDice(num.id)} />)
        }
      </div>
      {starter ? <button onClick={start}>Start</button> : <button onClick={roll}>{tenzies ? "Reset Game" : "Roll"}</button>}
      <div className="watch-bar">
        <h5>Time: {timer}</h5>
        <h5>Total rolls: {rolls}</h5>
      </div>
    </div>
  )
}

export default App


