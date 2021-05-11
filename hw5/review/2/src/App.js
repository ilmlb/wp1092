import { useState } from 'react'
import './App.css'
import { guess, startGame, restart } from './axios'

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')

  const startMenu = (
    <div>
      <button
        onClick={async () => {
          // 當接收到的 msg 不是 false 才會開始遊戲，否則跳出錯誤訊息視窗
          const msg = await startGame()
          if (msg) {
            setHasStarted(true)
          }
          else {
            alert('Server not responding or not connected')
          }
        }}
      >
        start game
      </button>
    </div>
  )

  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button
        onClick={async () => {
          const msg = await restart()
          if (msg) {
            setHasWon(false)
            setStatus('')
            setNumber('')
          }
          else {
            alert('Server not responding or not connected')
          }
        }}
      >
        restart
      </button>
    </>
  )

  // TODO:
  // 1. use async/await to call guess(number) in Axios
  // 2. Process the response from server to set the proper state values
  const handleGuess = async () => {
    const msg = await guess(number);
    if (msg) {
      if (msg === 'Equal') {
        setHasWon(true)
      }
      else {
        setStatus(msg);
      }
    }
    else {
      alert('Server not responding or not connected')
    }
  }

  const gameMode = (
    <>
      <p>Guess a number between 1 to 100</p>
      <input
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        onKeyDown={(e) =>{
          if (e.key === 'Enter') {
            handleGuess()
          }
        }}
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

  return <div className="App">{hasStarted ? game : startMenu}</div>
}

export default App
