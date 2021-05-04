import express from 'express'
import getNumber from '../core/getNumber'
import {fileName} from '../server'

const router = express.Router()

var fs = require('fs');

function roughScale(x, base) {
  const parsed = parseInt(x, base)
  if (isNaN(parsed)) {
    return 0
  }
  return parsed
}

// Just call getNumber(true) to generate a random number for guessing game
router.post('/start', (_, res) => {
  getNumber(true)

  res.json({ msg: 'The game has started.' })

  fs.appendFile(fileName, `start number=${getNumber()} ${parseTime()}\n`, function (err) {
    if (err) throw err;
    console.log('Start');
  })
})

router.get('/guess', (req, res) => {
  const number = getNumber()
  const guessed = roughScale(req.query.number, 10)
  fs.appendFile(fileName, `guess ${guessed} ${parseTime()}\n`, function (err) {
    if (err) throw err;
    console.log('Guess');
  })

  // check if NOT a num or not in range [1,100]
  if (!guessed || guessed < 1 || guessed > 100) {
    // res.status(400).send({ msg: 'Not a legal number.' })
    res.status(200).send({ msg: 'Not a legal number.' });
  }
  else {
  // TODO: check if number and guessed are the same,
  // and response with some hint "Equal", "Bigger", "Smaller"
    if (number === guessed) {
      // return "Equal";
      res.status(200).send({ msg: 'Equal' });
      fs.appendFile(fileName, "end-game\n", function (err) {
        if (err) throw err;
        console.log('End');
      })
    } else if (number > guessed) {
      // return "Bigger";
      res.status(200).send({ msg: 'Bigger' });
    } else {
      // return "Smaller";
      res.status(200).send({ msg: 'Smaller' });
    }
  }
})

// TODO: add router.post('/restart',...)
router.post('/restart', (_, res) => {
  getNumber(true)

  res.json({ msg: 'The game has restarted.' })

  fs.appendFile(fileName, `restart number=${getNumber()} ${parseTime()}\n`, function (err) {
    if (err) throw err;
    console.log('Restart');
  })
})

function parseTime() {
  let current = new Date();
  let yyyy = current.getFullYear();
  let momo = String(current.getMonth() + 1).padStart(2, '0');
  let dd = String(current.getDate()).padStart(2, '0');
  let hh = String(current.getHours()).padStart(2, '0');
  let mimi = String(current.getMinutes()).padStart(2, '0');
  let ss = String(current.getSeconds()).padStart(2, '0');
  return `${yyyy}-${momo}-${dd}-${hh}-${mimi}-${ss}`;
}

export default router
