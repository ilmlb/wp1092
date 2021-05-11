import express from 'express'
import getNumber from '../core/getNumber'
import {fileName, months} from '../server'
import fs from 'fs'

const router = express.Router()

function roughScale(x, base) {
  const parsed = parseInt(x, base)
  if (isNaN(parsed)) {
    return 0
  }
  return parsed
}

// Just call getNumber(true) to generate a random number for guessing game
router.post('/start', (_, res) => {
  getNumber(true,true)


  res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
  const number = getNumber()
  const guessed = roughScale(req.query.number, 10)

  // TODO: check if number and guessed are the same,
  // and response with some hint "Equal", "Bigger", "Smaller"

  // check if NOT a num or not in range [1,100]

  if (!guessed || guessed < 1 || guessed > 100) {
    res.status(400).send({ msg: `Error: ${req.query.number} is not a legal number (1 - 100)` })
  }
  else {
    let text = 'guess ' + guessed + ' ' + [ Date().split(' ')[3], months[Date().split(' ')[1]], Date().split(' ')[2], Date().split(' ')[4].split(':')[0], Date().split(' ')[4].split(':')[1], Date().split(' ')[4].split(':')[2] ].join('-') + '\n'
    fs.appendFile(fileName, text, (err) => {
      if (err) console.log("Error")
    })

    if (guessed == number) {
      res.status(200).send({ msg: `Equal` })
      fs.appendFile(fileName, 'end-game\n' , (err) => {
      if (err) console.log("Error")
    })
    } else if (guessed > number) {
      res.status(200).send({ msg: `Smaller` })
    } else if (guessed) {
      res.status(200).send({ msg: `Bigger` })
    }
  }
})

router.post('/restart', (_, res) => {
  getNumber(true,false)

  res.json({ msg: 'The game has started.' })
})

export default router
