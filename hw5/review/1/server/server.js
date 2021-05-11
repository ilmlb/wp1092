import express from 'express'
import cors from 'cors'
import path from 'path'
import fs from 'fs'

import guessRoute from './routes/guess'

const isProduction = process.env.NODE_ENV === 'production'

const app = express()

export let fileName;

export const months = {
    'Jan' : '01',
    'Feb' : '02',
    'Mar' : '03',
    'Apr' : '04',
    'May' : '05',
    'Jun' : '06',
    'Jul' : '07',
    'Aug' : '08',
    'Sep' : '09',
    'Oct' : '10',
    'Nov' : '11',
    'Dec' : '12'
}

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

  if (!fs.existsSync('./server/log')){
    fs.mkdirSync('./server/log')
  }

  fileName =  [ 'server/log/' + Date().split(' ')[3], months[Date().split(' ')[1]], Date().split(' ')[2], Date().split(' ')[4].split(':')[0], Date().split(' ')[4].split(':')[1] ].join('-') + '.log'
  fs.writeFile(fileName, '', function (err) {
    if (err) {
      console.log('Error')
    }
  })
})
