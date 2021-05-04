import express from 'express'
import cors from 'cors'
import path from 'path'

import guessRoute from './routes/guess'

const isProduction = process.env.NODE_ENV === 'production'

const app = express()

var fileName;

// init middleware
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  if (isProduction && req.headers['x-forwarded-proto'] !== 'https')
    return res.redirect('https://' + req.headers.host + req.url)
  return next()
})

// define routes
app.use('/api/guess', guessRoute)

const port = process.env.PORT || 4000

if (isProduction) {
  // set static folder
  const publicPath = path.join(__dirname, '..', 'build')

  app.use(express.static(publicPath))

  app.get('*', (_, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
  })
}

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
  var fs = require('fs');
  var dir = './server/log';

  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }

  let current = new Date();
  let yyyy = current.getFullYear();
  let momo = String(current.getMonth() + 1).padStart(2, '0');
  let dd = String(current.getDate()).padStart(2, '0');
  let hh = String(current.getHours()).padStart(2, '0');
  let mimi = String(current.getMinutes()).padStart(2, '0');
  fileName = `${dir}/${yyyy}-${momo}-${dd}-${hh}-${mimi}.log`;
  
})

export {fileName};
