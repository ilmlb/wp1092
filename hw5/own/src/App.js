import { useState } from 'react'
import './App.css'
import { guess, startGame, restart } from './axios'

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')
  const [responding, setResponding] = useState(true)
  const noResponse = "Server is not responding or not connected."

  const startMenu = (
    <div>
      <button
        onClick={async () => {
          await startGame()
          .then(response => {setHasStarted(true); setResponding(true);})
          .catch(error => {/*console.log(error);*/ setResponding(false);})
        }}
      >
        start game
      </button>
      <div>{responding? '':noResponse}</div>
    </div>
  )

  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button
        onClick={async () => {
          await restart()
          .then((response) => {
            setHasWon(false)
            setStatus('')
            setNumber('')
          })
          .catch(error => {/*console.log(error);*/ setResponding(false);})
        }}
      >
        restart
      </button>
      <div>{responding? '':noResponse}</div>
    </>
  )

  // TODO:
  // 1. use async/await to call guess(number) in Axios
  // 2. Process the response from server to set the proper state values
  const handleGuess = async () => {
    let s = await guess(number);
    setStatus(s);
    if (s === "Equal") {
      setHasWon(true);
    }
  }

  const gameMode = (
    <>
      <p>Guess a number between 1 to 100</p>
      <input
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      ></input>
      <button
        onClick={handleGuess}
        disabled={!number}
      >
        guess!
      </button>
      <p>{status}</p>
    </>
  )

  const game = (
    <div>
      {hasWon ? winningMode : gameMode}
    </div>
  )

  return (<div className="App">{hasStarted ? game : startMenu}</div>)
}

export default App
