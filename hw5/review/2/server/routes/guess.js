import express from 'express'
import getNumber from '../core/getNumber'

const router = express.Router()

// 取得日期時間，格式為年-月-日-分或是年-月-日-分-秒
function getFormattedDate(format = 's') {
  var date = new Date();
  var str = date.getFullYear() + "-" + ('0' + (date.getMonth() + 1)).slice(-2) + "-" + ('0' + date.getDate()).slice(-2) + "-" +  ('0' + date.getHours()).slice(-2) + "-" + ('0'+ date.getMinutes()).slice(-2);
  if (format === 's') {
    str += '-' + ('0' + date.getSeconds()).slice(-2)
  }
  return str;
}

// 開啟server後，新建一個log檔
const logFile = './server/log/' + getFormattedDate('m') + '.log';
var fs = require('fs');
fs.appendFile(logFile, '', function (err) {
  if (err) throw err;
  console.log('Saved!');
});

function roughScale(x, base) {
  const parsed = parseInt(x, base)
  if (isNaN(parsed)) {
    return 0
  }
  return parsed
}

// Just call getNumber(true) to generate a random number for guessing game
router.post('/start', (_, res) => {
  const number = getNumber(true)

  // 將開始動作記錄到.log
  const logText = `start number=${number} ${getFormattedDate()}\n`;
  fs.appendFile(logFile, logText, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

  res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
  const number = getNumber()
  const guessed = roughScale(req.query.number, 10)

  // 將猜測數字的動作記錄到.log
  const logText = `guess ${guessed} ${getFormattedDate()}\n`
  fs.appendFile(logFile, logText, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

  // check if NOT a num or not in range [1,100]
  if (!guessed || guessed < 1 || guessed > 100) {
    res.status(400).send({ msg: 'Not a legal number.' })
  }
  else {
  // TODO: check if number and guessed are the same,
  // and response with some hint "Equal", "Bigger", "Smaller"
    if (guessed < number) {
      res.send({msg: 'Bigger'})
    }
    else if(guessed > number) {
      res.send({msg: 'Smaller'})
    }
    else {
      res.send({msg: 'Equal'})

      // 猜中數字遊戲結束，記錄至.log
      fs.appendFile(logFile, 'end-game\n', function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    }
  }
})

// TODO: add router.post('/restart',...)
router.post('/restart', (_, res) => {
  const number = getNumber(true);

  const logText = `restart number=${number} ${getFormattedDate()}\n`;
  fs.appendFile(logFile, logText, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

  res.json({ msg: 'The game has restarted.' })
})

export default router
